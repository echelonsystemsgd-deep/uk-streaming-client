"""
PayPal REST API Client Helper (Python)
Zero external dependencies (uses standard library urllib, json, base64, uuid, time).
Implements token caching, Orders v2 creation/capture/authorize, refunding, and webhook verification.
"""

import os
import json
import base64
import uuid
import time
import urllib.request
import urllib.error
from typing import Dict, Any, Optional

class PayPalClient:
    def __init__(
        self,
        client_id: Optional[str] = None,
        client_secret: Optional[str] = None,
        environment: str = "sandbox"
    ):
        self.client_id = client_id or os.environ.get("PAYPAL_CLIENT_ID", "")
        self.client_secret = client_secret or os.environ.get("PAYPAL_CLIENT_SECRET", "")
        self.environment = environment.lower() or os.environ.get("PAYPAL_ENVIRONMENT", "sandbox").lower()

        if not self.client_id or not self.client_secret:
            raise ValueError("PayPal client_id and client_secret must be provided via constructor or environment variables.")

        if self.environment == "production" or self.environment == "live":
            self.base_url = "https://api-m.paypal.com"
        else:
            self.base_url = "https://api-m.sandbox.paypal.com"

        self._cached_token: Optional[str] = None
        self._token_expires_at: float = 0.0

    def get_access_token(self, force_refresh: bool = False) -> str:
        """
        Retrieves OAuth2 access token, reusing cached token if still valid.
        """
        now = time.time()
        # Return cached token if valid with a 60-second grace window
        if not force_refresh and self._cached_token and now < (self._token_expires_at - 60):
            return self._cached_token

        url = f"{self.base_url}/v1/oauth2/token"
        credentials = f"{self.client_id}:{self.client_secret}"
        encoded_creds = base64.b64encode(credentials.encode("utf-8")).decode("utf-8")

        headers = {
            "Authorization": f"Basic {encoded_creds}",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
            "Accept-Language": "en_US"
        }
        data = b"grant_type=client_credentials"

        req = urllib.request.Request(url, data=data, headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req) as resp:
                result = json.loads(resp.read().decode("utf-8"))
                self._cached_token = result["access_token"]
                expires_in = float(result.get("expires_in", 32400))
                self._token_expires_at = now + expires_in
                return self._cached_token
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8")
            raise RuntimeError(f"PayPal OAuth Error ({e.code}): {err_body}")

    def _api_request(
        self,
        method: str,
        path: str,
        payload: Optional[Dict[str, Any]] = None,
        request_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Internal request dispatcher handling authentication and idempotency.
        """
        token = self.get_access_token()
        url = f"{self.base_url}{path}"
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

        # Apply idempotency header to mutating requests
        if method.upper() in ["POST", "PATCH", "PUT"]:
            headers["PayPal-Request-Id"] = request_id or str(uuid.uuid4())

        data = json.dumps(payload).encode("utf-8") if payload is not None else None
        req = urllib.request.Request(url, data=data, headers=headers, method=method.upper())

        try:
            with urllib.request.urlopen(req) as resp:
                resp_data = resp.read().decode("utf-8")
                if not resp_data:
                    return {"status_code": resp.status}
                return json.loads(resp_data)
        except urllib.error.HTTPError as e:
            err_text = e.read().decode("utf-8")
            # If token expired, retry once
            if e.code == 401:
                token = self.get_access_token(force_refresh=True)
                headers["Authorization"] = f"Bearer {token}"
                retry_req = urllib.request.Request(url, data=data, headers=headers, method=method.upper())
                with urllib.request.urlopen(retry_req) as resp:
                    return json.loads(resp.read().decode("utf-8"))
            raise RuntimeError(f"PayPal API Error [{method.upper()} {path}] ({e.code}): {err_text}")

    # ==========================
    # Orders v2 Operations
    # ==========================

    def create_order(
        self,
        amount_value: str,
        currency_code: str = "USD",
        intent: str = "CAPTURE",
        custom_id: Optional[str] = None,
        description: Optional[str] = None,
        return_url: Optional[str] = None,
        cancel_url: Optional[str] = None,
        request_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Create a checkout order with Orders v2.
        """
        order_payload: Dict[str, Any] = {
            "intent": intent.upper(),
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": currency_code.upper(),
                        "value": str(amount_value)
                    }
                }
            ]
        }

        if custom_id:
            order_payload["purchase_units"][0]["custom_id"] = custom_id
        if description:
            order_payload["purchase_units"][0]["description"] = description

        if return_url or cancel_url:
            order_payload["application_context"] = {}
            if return_url:
                order_payload["application_context"]["return_url"] = return_url
            if cancel_url:
                order_payload["application_context"]["cancel_url"] = cancel_url

        return self._api_request("POST", "/v2/checkout/orders", payload=order_payload, request_id=request_id)

    def get_order(self, order_id: str) -> Dict[str, Any]:
        """
        Retrieve order status and details.
        """
        return self._api_request("GET", f"/v2/checkout/orders/{order_id}")

    def capture_order(self, order_id: str, request_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Capture payment for an approved order.
        """
        return self._api_request("POST", f"/v2/checkout/orders/{order_id}/capture", payload={}, request_id=request_id)

    def authorize_order(self, order_id: str, request_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Authorize payment for an approved order (hold funds).
        """
        return self._api_request("POST", f"/v2/checkout/orders/{order_id}/authorize", payload={}, request_id=request_id)

    # ==========================
    # Payments & Refunds
    # ==========================

    def refund_capture(
        self,
        capture_id: str,
        amount_value: Optional[str] = None,
        currency_code: Optional[str] = None,
        note_to_payer: Optional[str] = None,
        request_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Refund a captured payment (full if amount omitted, partial if amount specified).
        """
        payload: Dict[str, Any] = {}
        if amount_value and currency_code:
            payload["amount"] = {
                "value": str(amount_value),
                "currency_code": currency_code.upper()
            }
        if note_to_payer:
            payload["note_to_payer"] = note_to_payer

        return self._api_request("POST", f"/v2/payments/captures/{capture_id}/refund", payload=payload, request_id=request_id)

    # ==========================
    # Webhook Verification
    # ==========================

    def verify_webhook_signature(
        self,
        webhook_id: str,
        headers: Dict[str, str],
        event_body: Dict[str, Any]
    ) -> bool:
        """
        Verifies an incoming webhook against PayPal's verification endpoint.
        """
        # PayPal header keys can vary in case across frameworks
        normalized_headers = {k.upper(): v for k, v in headers.items()}

        payload = {
            "auth_algo": normalized_headers.get("PAYPAL-AUTH-ALGO"),
            "cert_url": normalized_headers.get("PAYPAL-CERT-URL"),
            "transmission_id": normalized_headers.get("PAYPAL-TRANSMISSION-ID"),
            "transmission_sig": normalized_headers.get("PAYPAL-TRANSMISSION-SIG"),
            "transmission_time": normalized_headers.get("PAYPAL-TRANSMISSION-TIME"),
            "webhook_id": webhook_id,
            "webhook_event": event_body
        }

        res = self._api_request("POST", "/v1/notifications/verify-webhook-signature", payload=payload)
        return res.get("verification_status") == "SUCCESS"

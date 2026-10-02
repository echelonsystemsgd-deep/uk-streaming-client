#!/usr/bin/env python3
"""
Quick CLI utility to verify PayPal API credentials and environment connectivity.
Usage:
    python test_auth.py [client_id] [client_secret] [sandbox|production]
Or set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET environment variables.
"""

import sys
import os
from paypal_client import PayPalClient

def main():
    client_id = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("PAYPAL_CLIENT_ID")
    client_secret = sys.argv[2] if len(sys.argv) > 2 else os.environ.get("PAYPAL_CLIENT_SECRET")
    env = sys.argv[3] if len(sys.argv) > 3 else os.environ.get("PAYPAL_ENVIRONMENT", "sandbox")

    if not client_id or not client_secret:
        print("[-] Error: Missing PayPal client credentials.")
        print("Usage: python test_auth.py <client_id> <client_secret> [sandbox|production]")
        print("Or export PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET.")
        sys.exit(1)

    print(f"[*] Testing PayPal Authentication against [{env}] environment...")
    try:
        client = PayPalClient(client_id=client_id, client_secret=client_secret, environment=env)
        token = client.get_access_token()
        print("[+] SUCCESS! Successfully authenticated with PayPal REST API.")
        print(f"[+] Access Token acquired (prefix): {token[:16]}... (valid for ~9 hours)")
    except Exception as e:
        print(f"[-] Authentication Failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

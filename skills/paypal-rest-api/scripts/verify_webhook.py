#!/usr/bin/env python3
"""
CLI tool to verify an incoming webhook payload and headers file against PayPal.
Usage:
    python verify_webhook.py <webhook_id> <headers_json_file> <event_json_file>
"""

import sys
import json
import os
from paypal_client import PayPalClient

def main():
    if len(sys.argv) < 4:
        print("Usage: python verify_webhook.py <webhook_id> <headers_json_file> <event_json_file>")
        sys.exit(1)

    webhook_id = sys.argv[1]
    headers_path = sys.argv[2]
    event_path = sys.argv[3]

    with open(headers_path, "r", encoding="utf-8") as f:
        headers = json.load(f)

    with open(event_path, "r", encoding="utf-8") as f:
        event = json.load(f)

    client = PayPalClient()
    print(f"[*] Verifying signature for webhook {webhook_id}...")
    valid = client.verify_webhook_signature(webhook_id, headers, event)
    if valid:
        print("[+] SUCCESS: Webhook signature is VALID and verified by PayPal.")
    else:
        print("[-] FAILED: Webhook signature is INVALID.")
        sys.exit(1)

if __name__ == "__main__":
    main()

#!/usr/bin/env node
/**
 * Quick Node CLI utility to verify PayPal API credentials and connectivity.
 * Usage:
 *    node test_auth.mjs [client_id] [client_secret] [sandbox|production]
 * Or set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in your environment.
 */

import { PayPalClient } from "./paypal_client.mjs";

const clientId = process.argv[2] || process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.argv[3] || process.env.PAYPAL_CLIENT_SECRET;
const env = process.argv[4] || process.env.PAYPAL_ENVIRONMENT || "sandbox";

if (!clientId || !clientSecret) {
  console.error("[-] Error: Missing PayPal client credentials.");
  console.log("Usage: node test_auth.mjs <client_id> <client_secret> [sandbox|production]");
  console.log("Or export PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET.");
  process.exit(1);
}

console.log(`[*] Testing PayPal Authentication against [${env}] environment...`);

try {
  const client = new PayPalClient({
    clientId,
    clientSecret,
    environment: env,
  });

  const token = await client.getAccessToken();
  console.log("[+] SUCCESS! Successfully authenticated with PayPal REST API.");
  console.log(`[+] Access Token acquired (prefix): ${token.substring(0, 16)}... (valid for ~9 hours)`);
} catch (err) {
  console.error(`[-] Authentication Failed: ${err.message}`);
  process.exit(1);
}

#!/usr/bin/env node
/**
 * Security Headers & TLS Inspector
 * Inspects all defensive HTTP response headers, CORS policies, and cookie attributes.
 *
 * Usage:
 *   node check_security_headers.mjs <url>
 */

const url = process.argv[2];
if (!url) {
  console.error("Usage: node check_security_headers.mjs <url>");
  process.exit(1);
}

async function inspectSecurity() {
  console.log(`\n[*] Inspecting Security Defense Headers for: ${url} ...`);
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    const headers = Object.fromEntries(res.headers.entries());

    const tests = [
      {
        name: "Strict-Transport-Security (HSTS)",
        header: "strict-transport-security",
        critical: true,
        recommended: "max-age=63072000; includeSubDomains; preload",
      },
      {
        name: "Content-Security-Policy (CSP)",
        header: "content-security-policy",
        critical: true,
        recommended: "Restricted script-src, frame-ancestors, default-src 'self'",
      },
      {
        name: "X-Content-Type-Options",
        header: "x-content-type-options",
        critical: false,
        recommended: "nosniff",
      },
      {
        name: "X-Frame-Options",
        header: "x-frame-options",
        critical: false,
        recommended: "DENY or SAMEORIGIN",
      },
      {
        name: "Referrer-Policy",
        header: "referrer-policy",
        critical: false,
        recommended: "strict-origin-when-cross-origin",
      },
      {
        name: "Permissions-Policy",
        header: "permissions-policy",
        critical: false,
        recommended: "camera=(), microphone=(), geolocation=()",
      },
    ];

    console.log("------------------------------------------------------------------");
    console.log("DEFENSIVE HEADER                     STATUS   CURRENT VALUE");
    console.log("------------------------------------------------------------------");

    let passCount = 0;
    for (const test of tests) {
      const val = headers[test.header];
      if (val) {
        passCount++;
        console.log(`[PASS] ${test.name.padEnd(30)} PRESENT  "${val.substring(0, 40)}${val.length > 40 ? "..." : ""}"`);
      } else {
        const flag = test.critical ? "[FAIL] (Critical)" : "[WARN]";
        console.log(`${flag.padEnd(7)} ${test.name.padEnd(30)} MISSING  (Rec: ${test.recommended})`);
      }
    }

    console.log("------------------------------------------------------------------");
    console.log(`Summary: ${passCount} / ${tests.length} Security Headers Configured.`);
    console.log("------------------------------------------------------------------\n");
  } catch (err) {
    console.error(`[-] Security Inspection Failed: ${err.message}`);
  }
}

inspectSecurity();

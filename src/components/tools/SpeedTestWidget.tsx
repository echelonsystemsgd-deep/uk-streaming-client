"use client";

import React, { useState } from "react";
import { Zap, Activity, CheckCircle2, Play, RefreshCw, Wifi, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SpeedTestWidget() {
  const [status, setStatus] = useState<"idle" | "testing" | "done">("idle");
  const [progress, setProgress] = useState(0);

  const runTest = () => {
    setStatus("testing");
    setProgress(15);

    setTimeout(() => setProgress(45), 600);
    setTimeout(() => setProgress(80), 1200);
    setTimeout(() => {
      setProgress(100);
      setStatus("done");
    }, 1800);
  };

  const resetTest = () => {
    setStatus("idle");
    setProgress(0);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#dd0e1c]">
            <Activity className="h-4 w-4" />
            <span>Interactive UK Network Diagnostic</span>
          </div>
          <h3 className="text-xl font-bold text-[#2c3640] tracking-tight">
            UK Broadband &amp; Buffer-Free Check
          </h3>
          <p className="text-xs text-gray-500">
            Simulate your latency to our London Docklands streaming relay.
          </p>
        </div>

        <div>
          {status === "idle" && (
            <Button
              variant="default"
              size="default"
              onClick={runTest}
              className="font-bold text-xs h-11 px-5 flex items-center gap-2 w-full sm:w-auto bg-[#dd0e1c] hover:bg-[#b00b16] text-white shadow-sm"
            >
              <Zap className="h-4 w-4" />
              <span>Run Buffer Check</span>
            </Button>
          )}

          {status === "testing" && (
            <Button
              variant="outline"
              size="default"
              disabled
              className="font-bold text-xs h-11 px-5 flex items-center gap-2 w-full sm:w-auto text-gray-500 bg-gray-50 border-gray-200"
            >
              <RefreshCw className="h-4 w-4 animate-spin text-[#dd0e1c]" />
              <span>Testing Relay...</span>
            </Button>
          )}

          {status === "done" && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetTest}
              className="font-semibold text-xs h-9 px-4 flex items-center gap-1.5 w-full sm:w-auto bg-white border-gray-300 text-gray-800 hover:bg-gray-50 shadow-sm"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Test Again</span>
            </Button>
          )}
        </div>
      </div>

      {/* Testing Animated Progress Bar */}
      {status === "testing" && (
        <div className="py-8 space-y-3">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Pinging London Docklands Relay &amp; Measuring Jitter...</span>
            <span className="font-mono text-gray-900 font-bold">{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full bg-[#dd0e1c] transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Done State: Results Display */}
      {status === "done" && (
        <div className="pt-6 space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 shadow-sm">
              <span className="text-[11px] text-gray-500 block uppercase font-medium">Ping Latency</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5 block">14 ms</span>
              <span className="text-[10px] text-gray-400">London Docklands</span>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 shadow-sm">
              <span className="text-[11px] text-gray-500 block uppercase font-medium">Download Bandwidth</span>
              <span className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5 block">56+ Mbps</span>
              <span className="text-[10px] text-gray-400">Fast UK Connection</span>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 shadow-sm">
              <span className="text-[11px] text-gray-500 block uppercase font-medium">Jitter &amp; Packet Loss</span>
              <span className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5 block">0.8 ms</span>
              <span className="text-[10px] text-gray-400">Zero Packet Loss</span>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 shadow-sm">
              <span className="text-[11px] text-gray-500 block uppercase font-medium">4K Cricket Rating</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5 block">A+</span>
              <span className="text-[10px] text-gray-400">Ultra HD 60fps</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                Verified: Your UK Connection is 100% Ready for Zero-Buffer 4K Streaming
              </h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Your Wi-Fi comfortably supports simultaneous 4K cricket on your living room Smart TV while other family members watch 14-day catch-up on Firesticks in the bedroom.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Idle Explainer Strip */}
      {status === "idle" && (
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-[#dd0e1c]" />
            <span>Recommended: 15 Mbps for Full HD 1080p • 30 Mbps for 4K UHD 60fps</span>
          </div>
          <span className="text-[11px] text-gray-400">No software installation required</span>
        </div>
      )}
    </div>
  );
}

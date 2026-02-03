"use client";
import React from "react";
import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Background Glows - আপনার থিমের সিগনেচার */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-600/10 rounded-full blur-[80px] animate-pulse delay-700"></div>

      <div className="relative text-center z-10">
        {/* Main Spinner with Glass effect */}
        <div className="relative mb-8 inline-block">
          {/* Outer Ring Animation */}
          <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full scale-150 animate-[ping_2s_infinite]"></div>

          <div className="bg-slate-900/40 backdrop-blur-xl p-6 rounded-[2rem] border border-slate-800 shadow-2xl relative">
            <Loader2 className="w-12 h-12 text-purple-500 animate-[spin_1.5s_linear_infinite]" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tighter text-white">
            Processing<span className="text-purple-500">...</span>
          </h2>

          {/* Modern Dots Animation */}
          <div className="flex justify-center items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-gradient-to-t from-purple-600 to-blue-400 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "0.8s",
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* System Message */}
        <p className="mt-8 text-xs font-mono text-slate-500 uppercase tracking-[0.3em]">
          Initializing Secure Environment
        </p>
      </div>
    </div>
  );
}

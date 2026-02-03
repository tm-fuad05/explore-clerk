"use client";
import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/dashboard" || pathname === "/admin-panel") return null;

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 relative z-10 mt-20">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <span className="text-xl font-bold text-white">YourBrand</span>
        </div>
        <p className="text-slate-400 mb-4">
          Building the future, one line at a time.
        </p>
        <div className="flex justify-center space-x-6 text-sm text-slate-400">
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>
        <p className="text-slate-500 text-sm mt-6">
          © 2026 YourBrand. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

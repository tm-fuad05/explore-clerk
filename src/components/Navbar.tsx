"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Info,
  Mail,
  LayoutDashboard,
  Shield,
  FileLock,
  ScrollText,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  const navLinks = [
    { href: "/", label: "Home", icon: Home, protected: false },
    { href: "/about", label: "About", icon: Info, protected: false },
    { href: "/contact", label: "Contact", icon: Mail, protected: false },
    { href: "/privacy", label: "Privacy", icon: FileLock, protected: false },
    { href: "/terms", label: "Terms", icon: ScrollText, protected: false },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      protected: true,
    },
    { href: "/admin-panel", label: "Admin", icon: Shield, protected: true },
  ];

  // Filtering links
  const filteredLinks = navLinks.filter((link) => {
    if (link.protected && !user) return false;
    if (link.href === "/admin-panel" && role !== "admin") return false;
    return true;
  });

  // Hide navbar for specific routes
  if (pathname === "/dashboard" || pathname === "/admin-panel") return null;

  return (
    <>
      {/* --- Desktop & Tablet Header --- */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-purple-500/20">
                <span className="text-white font-black text-lg sm:text-xl">
                  C
                </span>
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Clerk<span className="text-purple-500">App</span>
              </span>
            </Link>

            {/* Desktop Links (Hidden on Mobile) */}
            <div className="hidden lg:flex items-center gap-1">
              {filteredLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all font-medium group ${
                      isActive ? "bg-slate-800 text-white" : ""
                    }`}
                  >
                    <link.icon
                      className={`w-4 h-4 ${isActive ? "text-purple-400" : "group-hover:text-purple-400"}`}
                    />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-2 sm:gap-4">
              <SignedOut>
                <div className="flex items-center gap-2">
                  <SignInButton>
                    <button className="text-sm sm:text-base px-3 sm:px-5 py-2 rounded-lg font-semibold text-slate-300 hover:text-white transition-all cursor-pointer">
                      Log In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-4 pl-4 border-l border-slate-800">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox:
                          "w-8 h-8 sm:w-10 sm:h-10 ring-2 ring-purple-500/50",
                      },
                    }}
                    afterSignOutUrl="/"
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Mobile Bottom Navigation (Hidden on Large Screens) --- */}
      <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full border-t border-slate-800 bg-slate-950/90 backdrop-blur-xl pb-safe">
        <div className="flex justify-around items-center h-16">
          {filteredLinks.slice(0, 5).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all ${
                  isActive ? "text-purple-400" : "text-slate-500"
                }`}
              >
                <link.icon
                  size={20}
                  className={isActive ? "animate-pulse" : ""}
                />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {link.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 w-8 h-1 bg-purple-500 rounded-t-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

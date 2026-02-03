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
import { Home, Info, Mail, LayoutDashboard, Shield } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  const navLinks = [
    { href: "/", label: "Home", icon: Home, protected: false },
    { href: "/about", label: "About", icon: Info, protected: false },
    { href: "/contact", label: "Contact", icon: Mail, protected: false },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      protected: true,
    },
    { href: "/admin-panel", label: "Admin", icon: Shield, protected: true },
  ];

  const userNavLinks = user
    ? navLinks
    : navLinks.filter((link) => !link.protected);
  const roleBasedNavLinks =
    role === "admin"
      ? userNavLinks
      : userNavLinks.filter((link) => link.href !== "/admin-panel");

  if (pathname === "/dashboard" || pathname === "/admin-panel") return null;

  return (
    <>
      {/* ==================== TOP NAVBAR (Logo & Profile) ==================== */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 h-16 sm:h-18 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-all duration-300">
              <span className="text-white font-black text-xl">Z</span>
            </div>
            <span className="text-lg lg:text-2xl font-bold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Zod<span className="text-purple-500">Guard</span>
            </span>
          </Link>

          {/* Desktop Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-1">
            {roleBasedNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all font-medium group ${isActive && "bg-slate-800 text-white"}`}
                >
                  {link.icon && (
                    <link.icon
                      size={16}
                      className={isActive ? "text-purple-400" : ""}
                    />
                  )}
                  <span className="text-sm">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Profile / Auth Section (Visible on all screens) */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <div className="flex items-center gap-2 sm:gap-3">
                <SignInButton>
                  <button className="px-4 py-2 font-bold text-slate-300 hover:text-white transition-all cursor-pointer text-sm sm:text-base">
                    Log In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="px-5 py-2 sm:py-2.5 rounded-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 text-white transition-all active:scale-95 cursor-pointer text-sm sm:text-base">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10 ring-2 ring-purple-500/30",
                  },
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* ==================== MOBILE BOTTOM NAVBAR (Fixed Position) ==================== */}
      <div className="md:hidden fixed bottom-0 left-0 z-50 w-full border-t border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-2 py-3">
        <div className="flex justify-between items-center">
          {roleBasedNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-1 transition-all ${isActive ? "text-purple-400" : "text-slate-500"}`}
              >
                {link.icon && (
                  <link.icon
                    size={22}
                    className={isActive ? "scale-110" : ""}
                  />
                )}
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

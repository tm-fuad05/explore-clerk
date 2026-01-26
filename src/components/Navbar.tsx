import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Home, Info, Mail, LayoutDashboard, Shield } from "lucide-react";

export default async function Navbar() {
  const user = await currentUser();
  console.log(user);

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

  const visibleLinks = user
    ? navLinks
    : navLinks.filter((link) => !link.protected);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg- backdrop-blur-lg">
      <div>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200 shadow-lg">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Clerk NextJs
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {visibleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 hover:text-black hover:bg-blue-50 transition-all duration-200 font-medium group"
              >
                <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform group-hover:text-black text-white" />
                <span className="text-white group-hover:text-black">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <SignedOut>
              <div className="flex items-center gap-2">
                <SignInButton>
                  <button className="px-5 py-2 rounded-lg font-medium text-white hover:bg-slate-100 transition-all duration-200 hover:scale-105">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="px-5 py-2 rounded-lg font-medium bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 hover:scale-105">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-3 p-1 rounded-full bg-slate-100">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 ring-2 ring-blue-500 ring-offset-2",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-slate-200 bg-white">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-around">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors"
              >
                <link.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

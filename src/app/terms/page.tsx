"use client";
import React, { useState } from "react";
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Scale,
  Users,
  Ban,
  RefreshCw,
  Shield,
  ArrowRight,
} from "lucide-react";

interface Term {
  icon: React.ReactNode;
  title: string;
  content: string;
  subsections?: string[];
}

interface QuickLink {
  title: string;
  href: string;
}

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState<number>(0);

  const terms: Term[] = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Agreement to Terms",
      content:
        "By accessing and using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.",
      subsections: [
        "You must be at least 18 years old to use our services",
        "You are responsible for maintaining the confidentiality of your account",
        "You agree to accept responsibility for all activities under your account",
      ],
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "User Responsibilities",
      content:
        "As a user of our services, you agree to use our platform responsibly and in compliance with all applicable laws. You are solely responsible for your conduct and any data, text, information, usernames, graphics, or other materials that you submit, post, or display.",
      subsections: [
        "Provide accurate and complete registration information",
        "Maintain the security of your password and account",
        "Notify us immediately of any unauthorized use of your account",
        "Comply with all applicable local, state, national, and international laws",
      ],
    },
    {
      icon: <Ban className="w-5 h-5" />,
      title: "Prohibited Activities",
      content:
        "You may not use our services for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction including but not limited to copyright laws.",
      subsections: [
        "Harass, abuse, or harm another person or group",
        "Use another user's account without permission",
        "Provide false or misleading information",
        "Engage in any automated use of the system",
        "Interfere with or disrupt the services or servers",
        "Attempt to gain unauthorized access to any portion of the services",
      ],
    },
    {
      icon: <Scale className="w-5 h-5" />,
      title: "Intellectual Property",
      content:
        "The services and their original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.",
      subsections: [
        "All content is owned by us or our licensors",
        "You may not copy, modify, or distribute our content without permission",
        "User-generated content remains yours, but you grant us a license to use it",
        "Respect the intellectual property rights of others",
      ],
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Disclaimers & Limitations",
      content:
        "Our services are provided on an 'as is' and 'as available' basis. We make no warranties, expressed or implied, and hereby disclaim all warranties including without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.",
      subsections: [
        "We do not guarantee continuous, uninterrupted, or secure access",
        "We are not responsible for delays or failures due to circumstances beyond our control",
        "We are not liable for any indirect, incidental, or consequential damages",
      ],
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: "Modifications & Termination",
      content:
        "We reserve the right to modify or discontinue our services at any time without notice. We may also modify these terms at any time, and such modifications shall be effective immediately upon posting.",
      subsections: [
        "Continued use after modifications constitutes acceptance",
        "We may terminate or suspend your account at our discretion",
        "You may terminate your account at any time",
        "All provisions which should survive termination shall survive",
      ],
    },
  ];

  const quickLinks: QuickLink[] = [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Cookie Policy", href: "#" },
    { title: "Acceptable Use", href: "#" },
    { title: "Contact Us", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-20 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 -left-20 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        {/* Hero Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-full mb-8">
            <Scale className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">
              Legal Framework
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Terms of{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Service
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully. They contain important
            information about your legal rights and obligations.
          </p>
          <p className="text-sm text-slate-500 mt-6 font-mono tracking-tighter uppercase">
            Effective Date: January 27, 2026
          </p>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {quickLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="group flex items-center justify-between p-4 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-all duration-300"
            >
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                {link.title}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </div>

        {/* Main Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:col-span-4 h-fit sticky top-32 hidden lg:block">
            <div className="bg-slate-900/40 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5 text-indigo-400" />
                Table of Contents
              </h3>
              <nav className="space-y-3">
                {terms.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveSection(index);
                      document
                        .getElementById(`section-${index}`)
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                    }}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                      activeSection === index
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                    }`}
                  >
                    <span
                      className={`transition-colors ${activeSection === index ? "text-white" : "text-indigo-400"}`}
                    >
                      {term.icon}
                    </span>
                    <span className="text-sm font-bold tracking-tight">
                      {term.title}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content Sections Area */}
          <div className="lg:col-span-8 space-y-8">
            {terms.map((term, index) => (
              <section
                key={index}
                id={`section-${index}`}
                onMouseEnter={() => setActiveSection(index)}
                className={`bg-slate-900/30 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border transition-all duration-500 ${
                  activeSection === index
                    ? "border-indigo-500/40 shadow-2xl shadow-indigo-500/5 bg-slate-900/60"
                    : "border-slate-800/50 opacity-80"
                }`}
              >
                <div className="flex items-center gap-5 mb-8">
                  <div
                    className={`p-4 rounded-2xl ${activeSection === index ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "bg-slate-800 text-slate-400"}`}
                  >
                    {term.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">
                    {term.title}
                  </h2>
                </div>

                <p className="text-slate-400 text-lg leading-relaxed mb-10 border-l-2 border-indigo-500/20 pl-6">
                  {term.content}
                </p>

                {term.subsections && (
                  <div className="grid sm:grid-cols-1 gap-4">
                    {term.subsections.map((subsection, subIndex) => (
                      <div
                        key={subIndex}
                        className="group flex items-start gap-4 p-4 rounded-2xl bg-slate-950/40 border border-slate-800/50 hover:border-indigo-500/30 transition-all"
                      >
                        <div className="mt-1 p-1 bg-indigo-500/10 rounded-full">
                          <CheckCircle className="w-4 h-4 text-indigo-400" />
                        </div>
                        <p className="text-slate-300 text-sm md:text-base group-hover:text-white transition-colors">
                          {subsection}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* Warning Banner */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl rounded-[2.5rem] p-10 border border-yellow-500/20 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Shield className="w-8 h-8 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Legal Compliance
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    By accessing our platform, you confirm your understanding of
                    these terms. These constitute a legally binding agreement.
                    If you do not agree, please cease use immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-slate-800 flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Questions About Terms?
              </h2>
              <p className="text-slate-400 mb-8 max-w-md">
                Our legal team is here to help you understand our service
                framework.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:legal@company.com"
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20 transform hover:-translate-y-1 active:scale-95"
                >
                  Contact Legal Team
                </a>
                <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all border border-slate-700 transform hover:-translate-y-1">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Footer */}
        <footer className="mt-24 pt-10 border-t border-slate-900 text-center">
          <p className="text-slate-600 text-sm">
            © 2026 YourTech Company. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

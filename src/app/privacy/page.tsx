"use client";
import React, { useState } from "react";
import {
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  Bell,
  ChevronDown,
  Clock,
  ExternalLink,
} from "lucide-react";

// Types
interface Section {
  icon: React.ReactNode;
  title: string;
  content: string;
}

interface HighlightCard {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function PrivacyPolicy() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const sections: Section[] = [
    {
      icon: <Database className="w-5 h-5" />,
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us, including name, email address, and any other information you choose to provide. We also automatically collect certain information about your device when you use our services, including IP address, browser type, operating system, and usage data through cookies and similar technologies.",
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "How We Use Your Information",
      content:
        "Your information helps us provide, maintain, and improve our services. We use it to communicate with you, respond to your requests, send you technical notices and updates, monitor and analyze trends and usage, personalize your experience, and protect against fraudulent or illegal activity.",
    },
    {
      icon: <UserCheck className="w-5 h-5" />,
      title: "Information Sharing",
      content:
        "We do not sell your personal information. We may share your information with service providers who perform services on our behalf, with your consent, to comply with legal obligations, or to protect our rights and safety. Any third parties we work with are contractually obligated to protect your data.",
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption of data in transit and at rest, regular security assessments, and strict access controls.",
    },
    {
      icon: <Bell className="w-5 h-5" />,
      title: "Your Rights & Choices",
      content:
        "You have the right to access, update, or delete your personal information. You can opt out of marketing communications, manage cookie preferences, and request a copy of your data. For EU residents, you have additional rights under GDPR including data portability and the right to object to processing.",
    },
  ];

  const highlights: HighlightCard[] = [
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Secure",
      desc: "Enterprise-grade encryption",
    },
    {
      icon: <UserCheck className="w-5 h-5" />,
      title: "Transparent",
      desc: "Clear data practices",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Compliant",
      desc: "GDPR & CCPA ready",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-purple-500/30">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 -right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-24">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900/50 border border-slate-800 rounded-full mb-8">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
              Security First
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Privacy{" "}
            <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>

          <div className="flex items-center justify-center gap-4 text-slate-400 text-sm">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Last updated: Jan 27, 2026
            </span>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <span>v2.1.0</span>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 border border-slate-800/50 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-purple-400 mb-4 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-white font-bold mb-1">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Expandable Policy Sections */}
        <div className="space-y-4 mb-16">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`bg-slate-900/40 backdrop-blur-xl rounded-[2rem] border transition-all duration-300 ${
                expandedSection === index
                  ? "border-purple-500/40 shadow-2xl shadow-purple-500/5"
                  : "border-slate-800/50"
              }`}
            >
              <button
                onClick={() =>
                  setExpandedSection(expandedSection === index ? null : index)
                }
                className="w-full flex items-center justify-between p-7 text-left"
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`p-3 rounded-2xl transition-colors ${
                      expandedSection === index
                        ? "bg-purple-500 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {section.icon}
                  </div>
                  <h2
                    className={`text-xl font-bold transition-colors ${
                      expandedSection === index
                        ? "text-white"
                        : "text-slate-300"
                    }`}
                  >
                    {section.title}
                  </h2>
                </div>
                <div
                  className={`w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center transition-transform duration-300 ${
                    expandedSection === index
                      ? "rotate-180 border-purple-500/50"
                      : ""
                  }`}
                >
                  <ChevronDown
                    className={`w-4 h-4 ${expandedSection === index ? "text-purple-400" : "text-slate-500"}`}
                  />
                </div>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  expandedSection === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-8 pb-8 pt-2 ml-14">
                    <p className="text-slate-400 leading-relaxed text-lg">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cookies Section Card */}
        <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 border border-slate-800 mb-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Database size={120} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Cookies & Tracking
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl leading-relaxed">
            We use cookies to enhance your experience, analyze usage, and assist
            in our marketing efforts. You can control cookies through your
            browser settings at any time.
          </p>
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-950 rounded-xl font-bold hover:bg-purple-400 hover:text-white transition-all transform hover:scale-105 shadow-xl shadow-white/5">
            Manage Preferences <ExternalLink size={16} />
          </button>
        </div>

        {/* Contact & Footer */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-800">
            <h3 className="text-white font-bold mb-4">Questions?</h3>
            <p className="text-slate-400 text-sm mb-4">
              Email our data protection officer at:
            </p>
            <span className="text-purple-400 font-medium cursor-pointer hover:underline">
              privacy@company.com
            </span>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-800">
            <h3 className="text-white font-bold mb-4">Office Address</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              123 Privacy Street, Suite 100,
              <br />
              New York, NY 10001
            </p>
          </div>
        </div>

        <footer className="text-center border-t border-slate-900 pt-10">
          <p className="text-slate-600 text-sm">
            © 2026 YourTech Company Inc. All rights reserved.
            <br />
            Built with Type-safe Security.
          </p>
        </footer>
      </div>
    </div>
  );
}

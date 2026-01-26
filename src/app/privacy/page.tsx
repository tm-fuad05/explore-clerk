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
  ChevronUp,
  LucideIcon,
} from "lucide-react";

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

  const toggleSection = (index: number): void => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const sections: Section[] = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us, including name, email address, and any other information you choose to provide. We also automatically collect certain information about your device when you use our services, including IP address, browser type, operating system, and usage data through cookies and similar technologies.",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      content:
        "Your information helps us provide, maintain, and improve our services. We use it to communicate with you, respond to your requests, send you technical notices and updates, monitor and analyze trends and usage, personalize your experience, and protect against fraudulent or illegal activity.",
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Information Sharing",
      content:
        "We do not sell your personal information. We may share your information with service providers who perform services on our behalf, with your consent, to comply with legal obligations, or to protect our rights and safety. Any third parties we work with are contractually obligated to protect your data.",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption of data in transit and at rest, regular security assessments, and strict access controls.",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Your Rights & Choices",
      content:
        "You have the right to access, update, or delete your personal information. You can opt out of marketing communications, manage cookie preferences, and request a copy of your data. For EU residents, you have additional rights under GDPR including data portability and the right to object to processing.",
    },
  ];

  const highlights: HighlightCard[] = [
    { icon: <Lock />, title: "Secure", desc: "Enterprise-grade encryption" },
    { icon: <UserCheck />, title: "Transparent", desc: "Clear data practices" },
    { icon: <Shield />, title: "Compliant", desc: "GDPR & CCPA ready" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-6 shadow-2xl shadow-purple-500/50 transform hover:scale-110 transition-transform duration-300">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Privacy Policy
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Your privacy matters to us. Learn how we collect, use, and protect
            your information.
          </p>
          <p className="text-sm text-slate-400 mt-4">
            Last updated: January 27, 2026
          </p>
        </div>

        {/* Key Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {highlights.map((item: HighlightCard, i: number) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              <div className="text-purple-400 mb-3">{item.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-slate-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Expandable Sections */}
        <div className="space-y-4 mb-16">
          {sections.map((section: Section, index: number) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:bg-white/15"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-center justify-between p-6 text-left transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="text-purple-400">{section.icon}</div>
                  <h2 className="text-xl font-semibold text-white">
                    {section.title}
                  </h2>
                </div>
                {expandedSection === index ? (
                  <ChevronUp className="w-6 h-6 text-purple-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-slate-400" />
                )}
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  expandedSection === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="px-6 pb-6 pt-0">
                  <p className="text-slate-300 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Sections */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Cookies & Tracking
          </h2>
          <p className="text-slate-300 mb-4">
            We use cookies and similar tracking technologies to enhance your
            experience, analyze usage, and assist in our marketing efforts. You
            can control cookies through your browser settings.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
            Manage Cookie Preferences
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-slate-300 mb-4">
            If you have questions about this Privacy Policy or our data
            practices, please contact us at:
          </p>
          <div className="space-y-2 text-slate-300">
            <p>
              Email:{" "}
              <span className="text-purple-400">privacy@company.com</span>
            </p>
            <p>Address: 123 Privacy Street, Suite 100, City, State 12345</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-400 text-sm">
          <p>© 2026 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

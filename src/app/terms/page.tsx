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
      icon: <FileText className="w-6 h-6" />,
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
      icon: <Users className="w-6 h-6" />,
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
      icon: <Ban className="w-6 h-6" />,
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
      icon: <Scale className="w-6 h-6" />,
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
      icon: <AlertCircle className="w-6 h-6" />,
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
      icon: <RefreshCw className="w-6 h-6" />,
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
    { title: "Privacy Policy", href: "#privacy" },
    { title: "Cookie Policy", href: "#cookies" },
    { title: "Acceptable Use", href: "#use" },
    { title: "Contact Us", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-2xl mb-6 shadow-2xl shadow-indigo-500/50 transform hover:rotate-12 transition-transform duration-300">
            <Scale className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Please read these terms carefully before using our services
          </p>
          <p className="text-sm text-slate-400 mt-4">
            Effective Date: January 27, 2026
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-12">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-indigo-400" />
            Quick Links
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            {quickLinks.map((link: QuickLink, i: number) => (
              <a
                key={i}
                href={link.href}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-all duration-200 text-center border border-white/10 hover:border-indigo-400"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 sticky top-6">
              <h3 className="text-white font-semibold mb-4">Contents</h3>
              <nav className="space-y-2">
                {terms.map((term: Term, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveSection(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeSection === index
                        ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg"
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={
                          activeSection === index
                            ? "text-white"
                            : "text-indigo-400"
                        }
                      >
                        {term.icon}
                      </div>
                      <span className="text-sm font-medium">{term.title}</span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {terms.map((term: Term, index: number) => (
              <div
                key={index}
                id={`section-${index}`}
                className={`bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 transition-all duration-500 ${
                  activeSection === index
                    ? "ring-2 ring-indigo-400 shadow-2xl shadow-indigo-500/20"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-indigo-400">{term.icon}</div>
                  <h2 className="text-2xl font-bold text-white">
                    {term.title}
                  </h2>
                </div>
                <p className="text-slate-300 leading-relaxed mb-6">
                  {term.content}
                </p>

                {term.subsections && (
                  <div className="space-y-3">
                    {term.subsections.map(
                      (subsection: string, subIndex: number) => (
                        <div key={subIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-300 text-sm">{subsection}</p>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-8 border border-yellow-500/30 mb-8">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Important Notice
              </h3>
              <p className="text-slate-200 leading-relaxed">
                These terms constitute a legally binding agreement between you
                and us. By using our services, you acknowledge that you have
                read, understood, and agree to be bound by these terms. If you
                have any questions or concerns, please contact our legal team
                before proceeding.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Questions About Our Terms?
          </h2>
          <p className="text-slate-300 mb-6">
            If you have any questions about these Terms of Service, please don't
            hesitate to contact us.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:legal@company.com"
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
            >
              Contact Legal Team
            </a>
            <a
              href="#privacy"
              className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              View Privacy Policy
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-400 text-sm">
          <p>© 2026 Your Company. All rights reserved.</p>
          <p className="mt-2">
            These terms were last updated on January 27, 2026
          </p>
        </div>
      </div>
    </div>
  );
}

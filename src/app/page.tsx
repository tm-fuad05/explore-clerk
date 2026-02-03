"use client";

import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  ChevronDown,
} from "lucide-react";
import { useUser } from "@clerk/nextjs"; // useUser ইমপোর্ট করা আছে

export default function Home() {
  const { user, isLoaded } = useUser(); // isLoaded যোগ করা হলো যাতে ডাটা লোড না হওয়া পর্যন্ত অপেক্ষা করে

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Global Background Decorative Circles - Hero Section */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Build Something
              <span className="block bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Extraordinary
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Transform your ideas into reality with our cutting-edge platform.
              Fast, powerful, and designed for the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-[0.98]">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 active:scale-[0.98]">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-8 h-8 text-purple-400 mx-auto" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Experience blazing fast performance that scales with your needs.",
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description:
                  "Enterprise-grade security with 99.9% uptime guarantee.",
              },
              {
                icon: Sparkles,
                title: "Beautiful Design",
                description:
                  "Stunning interfaces that your users will love to interact with.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 hover:border-blue-500 transition-all transform hover:scale-105 shadow-xl"
              >
                <feature.icon className="w-12 h-12 text-blue-400 mb-4" />{" "}
                {/* আইকন কালার পরিবর্তন */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-linear-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied customers and transform your business
            today.
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 active:scale-[0.98] shadow-lg shadow-white/20">
            Start Your Journey
          </button>
        </div>
      </section>
    </div>
  );
}

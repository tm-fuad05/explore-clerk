"use client";
import React from "react";
import {
  Users,
  Target,
  Zap,
  Heart,
  Award,
  Shield,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Years Experience", value: "10+", icon: Award },
    { label: "Happy Clients", value: "500+", icon: Heart },
    { label: "Projects Completed", value: "1000+", icon: Target },
    { label: "Team Members", value: "50+", icon: Users },
  ];

  const values = [
    {
      icon: Target,
      title: "Mission Driven",
      description:
        "We are committed to delivering exceptional solutions that drive real business value.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Innovation First",
      description:
        "Staying ahead of the curve with cutting-edge technologies and creative approaches.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Heart,
      title: "Customer Focused",
      description:
        "Your success is our success. We build lasting relationships through trust.",
      color: "from-blue-600 to-indigo-600",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description:
        "Rigorous standards ensure every project meets the highest levels of excellence.",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  // Team and Timeline Data (আপনার আগের ডেটাগুলোই থাকবে)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-purple-500/30">
      {/* Background Blobs (হোমপেজের মতো একই স্টাইল) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob"></div>
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-xl rounded-full border border-slate-800 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-slate-300">
              About Our Company
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Building the Future of <br />
            <span className="bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Digital Innovation
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We're a passionate team of innovators, designers, and developers
            dedicated to creating exceptional digital experiences that transform
            businesses.
          </p>
        </div>
      </section>

      {/* Stats Section (Glassmorphism কার্ড) */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 text-center border border-slate-800/50 hover:border-purple-500/50 transition-all duration-300 group shadow-2xl"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/20">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-slate-500 font-medium uppercase tracking-wider text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <div className="h-1.5 w-24 bg-linear-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, i) => (
              <div
                key={i}
                className="group bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-slate-800 hover:bg-slate-800/40 transition-all duration-500"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-linear-to-br ${value.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (হোমপেজের সাথে মিল রেখে) */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-linear-to-r from-blue-600 to-indigo-600 rounded-[2rem] p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Let's collaborate to bring your vision to life and create
              something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-slate-100 transition-all transform hover:scale-105 shadow-xl">
                Get Started Now
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                Learn More <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import {
  Users,
  Target,
  Zap,
  Heart,
  Award,
  TrendingUp,
  Shield,
  Sparkles,
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
        "We are committed to delivering exceptional solutions that drive real business value and exceed expectations.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Innovation First",
      description:
        "Staying ahead of the curve with cutting-edge technologies and creative approaches to solve complex challenges.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Heart,
      title: "Customer Focused",
      description:
        "Your success is our success. We build lasting relationships through trust, transparency, and dedication.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description:
        "Rigorous standards and best practices ensure every project meets the highest levels of excellence.",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      avatar: "SJ",
      color: "from-blue-500 to-purple-500",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      avatar: "MC",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      avatar: "ER",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      avatar: "DK",
      color: "from-orange-500 to-amber-500",
    },
  ];

  const timeline = [
    {
      year: "2014",
      title: "The Beginning",
      description: "Founded with a vision to transform digital experiences",
    },
    {
      year: "2017",
      title: "Major Growth",
      description: "Expanded team to 25+ talented professionals",
    },
    {
      year: "2020",
      title: "Global Reach",
      description: "Opened offices in 5 countries worldwide",
    },
    {
      year: "2024",
      title: "Innovation Hub",
      description: "Launched cutting-edge AI and ML solutions",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                About Our Company
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Building the Future of Digital Innovation
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              We're a passionate team of innovators, designers, and developers
              dedicated to creating exceptional digital experiences that
              transform businesses and delight users worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            The principles that guide everything we do and shape our culture
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {values.map((value, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group hover:-translate-y-1"
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl mb-4 group-hover:scale-110 transition-transform`}
              >
                <value.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {value.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Our Journey
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A decade of growth, innovation, and success
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>

            {timeline.map((item, i) => (
              <div key={i} className="relative mb-12 last:mb-0">
                <div
                  className={`flex items-center ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    className={`w-1/2 ${i % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:-translate-y-1">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg"></div>

                  <div className="w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Meet Our Leadership
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            The talented minds driving our vision forward
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {team.map((member, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group hover:-translate-y-1"
            >
              <div
                className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-br ${member.color} rounded-2xl flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 transition-transform`}
              >
                {member.avatar}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {member.name}
              </h3>
              <p className="text-slate-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's collaborate to bring your vision to life and create something
            extraordinary together.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl transition-all hover:scale-105">
              Get Started
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold border-2 border-white/50 hover:bg-white/30 transition-all hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

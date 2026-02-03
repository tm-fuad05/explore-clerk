"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "contact@company.com",
      subdetails: "support@company.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      subdetails: "Mon-Fri 9am-6pm EST",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Business Street",
      subdetails: "New York, NY 10001",
      color: "from-blue-600 to-indigo-600",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: "Monday - Friday",
      subdetails: "9:00 AM - 6:00 PM EST",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const socialLinks = [
    { icon: Facebook, color: "hover:bg-blue-600", label: "Facebook" },
    { icon: Twitter, color: "hover:bg-sky-500", label: "Twitter" },
    { icon: Linkedin, color: "hover:bg-blue-700", label: "LinkedIn" },
    { icon: Instagram, color: "hover:bg-pink-600", label: "Instagram" },
  ];

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-purple-500/30">
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob"></div>
        <div className="absolute bottom-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-xl rounded-full border border-slate-800 mb-6">
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-slate-300">
              Get In Touch
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Let's Start a{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Conversation
            </span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Have a question or want to work together? Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, i) => (
            <div
              key={i}
              className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 border border-slate-800/50 hover:border-purple-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-2xl"
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${info.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/10`}
              >
                <info.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {info.title}
              </h3>
              <p className="text-slate-300 font-medium mb-1 text-sm">
                {info.details}
              </p>
              <p className="text-xs text-slate-500">{info.subdetails}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="bg-slate-900/40 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 border border-slate-800 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-2">
              Send us a Message
            </h2>
            <p className="text-slate-400 mb-8 text-sm">
              Fill out the form below and we'll get back within 24 hours.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-slate-400">
                  Thank you for reaching out. Talk soon!
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {[
                  {
                    label: "Full Name",
                    name: "name",
                    type: "text",
                    placeholder: "John Doe",
                  },
                  {
                    label: "Email Address",
                    name: "email",
                    type: "email",
                    placeholder: "john@example.com",
                  },
                  {
                    label: "Subject",
                    name: "subject",
                    type: "text",
                    placeholder: "How can we help?",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-semibold text-slate-400 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={(formData as any)[field.name]}
                      onChange={handleChange}
                      className="w-full bg-slate-950/50 px-4 py-4 rounded-xl border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-slate-950/50 px-4 py-4 rounded-xl border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-2 group"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Map & FAQ & Social */}
          <div className="space-y-8">
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-slate-800 h-80 flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i12!2i1234!3i2345!2m3!1e0!2sm!3i420120488!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0!23i4111425')!important] opacity-20 group-hover:opacity-30 transition-opacity bg-cover"></div>
              <div className="relative z-10 text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-purple-500 animate-bounce" />
                <p className="text-white font-bold text-xl">Our Office</p>
                <p className="text-slate-400 text-sm">
                  123 Business Street, New York, NY
                </p>
              </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6">
                Quick Answers
              </h3>
              <div className="space-y-6">
                {[
                  {
                    q: "Response time?",
                    a: "Within 24 hours during business days.",
                  },
                  {
                    q: "Consultations?",
                    a: "Free 30-minute consultation for new clients.",
                  },
                ].map((faq, idx) => (
                  <div
                    key={idx}
                    className="pb-4 border-b border-slate-800 last:border-0 last:pb-0"
                  >
                    <h4 className="font-semibold text-purple-400 text-sm mb-1">
                      {faq.q}
                    </h4>
                    <p className="text-slate-400 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-2xl">
              <h3 className="text-xl font-bold mb-2">Connect With Us</h3>
              <p className="mb-6 text-blue-100 text-sm">
                Stay updated with our latest news and features.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <button
                    key={i}
                    className={`w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:bg-white/20`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

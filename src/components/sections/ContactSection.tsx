"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, MessageSquare, Mail, Clock, Send, CheckCircle2, ChevronRight } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", device: "Firestick", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email && form.name) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-background-elevated/40 border-b border-border/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#dd0e1c]">
            WE ARE HERE TO HELP
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2c3640] tracking-tight">
            Customer Care &amp; Support
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Need device setup assistance, channel advice, or activation status? Connect directly with ChitramTV&apos;s support desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Contact Methods Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <Card className="p-6 bg-white border-gray-200 shadow-sm rounded-xl">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="h-10 w-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-[#dd0e1c] shrink-0">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#2c3640]">
                    WhatsApp Live Chat
                  </h4>
                  <span className="text-xs text-emerald-700 font-semibold">
                    Fastest Response (&lt;5 Minutes)
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                Message our technical team directly on WhatsApp for real-time setup guidance on Firestick, Samsung TV, ChitramTV Black Edition C1 box, or Android.
              </p>
              <a
                href="https://wa.me/447979637777"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-3 h-11 w-full transition-colors shadow-sm"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Start WhatsApp Chat (07979637777)</span>
              </a>
            </Card>

            <Card className="p-6 bg-white border-gray-200 shadow-sm rounded-xl">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="h-10 w-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-[#dd0e1c] shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#2c3640]">
                    UK Telephone Helpline
                  </h4>
                  <span className="text-xs text-[#dd0e1c] font-bold">
                    07979637777
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct UK phone helpline for subscriptions, hardware orders, and technical support. Operated by Shiva Technology Ltd.
              </p>
            </Card>

            <Card className="p-6 bg-white border-gray-200 shadow-sm rounded-xl">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="h-10 w-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-[#dd0e1c] shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#2c3640]">
                    Email Desk
                  </h4>
                  <span className="text-xs text-gray-700 font-medium">
                    support@chitramtv.eu
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Open 24 hours. Automated credentials dispatch runs 24/7 without interruption.
              </p>
            </Card>

          </div>

          {/* Contact Ticket Form */}
          <div className="lg:col-span-7">
            <Card className="p-5 sm:p-8 bg-white border-gray-200 shadow-sm rounded-xl">
              <CardTitle className="text-xl sm:text-2xl font-bold text-[#2c3640] mb-1">
                Send an Enquiry to Our Team
              </CardTitle>
              <p className="text-xs text-gray-600 mb-6">
                Fill in your details and we will reply to your email or WhatsApp promptly.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Raj Patel"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#dd0e1c] focus:outline-none focus:ring-1 focus:ring-[#dd0e1c] min-h-[48px] shadow-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#dd0e1c] focus:outline-none focus:ring-1 focus:ring-[#dd0e1c] min-h-[48px] shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-device" className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Your Primary TV / Streaming Device
                    </label>
                    <select
                      id="contact-device"
                      value={form.device}
                      onChange={(e) => setForm({ ...form, device: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-base sm:text-sm text-gray-900 focus:border-[#dd0e1c] focus:outline-none focus:ring-1 focus:ring-[#dd0e1c] min-h-[48px] shadow-sm"
                    >
                      <option value="ChitramTV_C1">ChitramTV Black Edition C1 Box</option>
                      <option value="Firestick">Amazon Fire TV Stick (4K / HD)</option>
                      <option value="AndroidTV">Android TV / Google TV</option>
                      <option value="AppleTV">Apple TV 4K</option>
                      <option value="Samsung">Samsung Smart TV (Tizen)</option>
                      <option value="LG">LG Smart TV (webOS)</option>
                      <option value="Mobile">iOS / Android Smartphone or Tablet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      How Can We Help You?
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Ask about channel availability, account renewal, C1 Box hardware, or setup assistance..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#dd0e1c] focus:outline-none focus:ring-1 focus:ring-[#dd0e1c] resize-none shadow-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="w-full font-bold flex items-center justify-center gap-2 min-h-[48px] text-base sm:text-sm bg-[#dd0e1c] hover:bg-[#b00b16] text-white shadow-sm"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Message</span>
                  </Button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[#2c3640]">Thank You, {form.name}!</h4>
                  <p className="text-xs text-gray-600 max-w-sm mx-auto">
                    Your enquiry has been received. We will respond to <strong className="text-gray-900">{form.email}</strong> shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="min-h-[44px] bg-white border-gray-300 text-gray-800 hover:bg-gray-50 shadow-sm"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", device: "Firestick", message: "" });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              )}
            </Card>
          </div>

        </div>

        {/* Link to dedicated /contact page */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-gray-900 bg-white border border-gray-300 hover:border-gray-400 px-5 py-3 rounded-lg shadow-sm transition-colors min-h-[44px]"
          >
            <span>Visit Full Support Desk, Operating Hours &amp; Ticket Center</span>
            <ChevronRight className="h-4 w-4 text-[#dd0e1c]" />
          </Link>
        </div>

      </div>
    </section>
  );
}

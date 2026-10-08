"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, MessageSquare, Mail, Clock, Send, CheckCircle2, ChevronRight, ExternalLink } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", device: "Amazon Fire TV Stick", message: "" });
  const [whatsAppRedirectUrl, setWhatsAppRedirectUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email && form.name) {
      const messageBody = `*New ChitramTV UK Enquiry*\n\n` +
        `*Name:* ${form.name}\n` +
        `*Email:* ${form.email}\n` +
        `*Device:* ${form.device}\n` +
        `*Message:* ${form.message}`;
      
      const url = `https://wa.me/447979637777?text=${encodeURIComponent(messageBody)}`;
      setWhatsAppRedirectUrl(url);
      setSubmitted(true);

      // Attempt immediate redirection to WhatsApp
      if (typeof window !== "undefined") {
        window.open(url, "_blank");
      }
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-20 bg-[#f4f6f8] border-b border-gray-200">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#dd0e1c]">
            WE ARE HERE TO HELP
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2c3640] tracking-tight">
            Customer Care &amp; Support
          </h2>
          <p className="text-xs sm:text-base text-gray-600 leading-relaxed">
            Need device setup assistance, channel advice, renewal verification, or activation status? Connect directly with ChitramTV&apos;s UK support desk on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Contact Methods Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <Card className="p-5 sm:p-6 bg-white border-gray-200 shadow-sm rounded-xl">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#2c3640]">
                    WhatsApp Live Desk
                  </h4>
                  <span className="text-xs text-emerald-700 font-semibold">
                    Fastest Response (&lt;5 Minutes)
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                Message our UK technical team directly on WhatsApp for real-time setup guidance on Firestick, Samsung TV, C1 Box, or Android.
              </p>
              <a
                href="https://wa.me/447979637777?text=Hi%20ChitramTV%20Support%2C%20I%20have%20an%20enquiry%20regarding%20your%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-3 h-11 w-full transition-colors shadow-sm min-h-[44px]"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat on WhatsApp (07979637777)</span>
              </a>
            </Card>

            <Card className="p-5 sm:p-6 bg-white border-gray-200 shadow-sm rounded-xl">
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
                Direct UK phone helpline for subscriptions, renewals, and technical inquiries. Operated by Shiva Technology Ltd.
              </p>
            </Card>

            <Card className="p-5 sm:p-6 bg-white border-gray-200 shadow-sm rounded-xl">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="h-10 w-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-[#2c3640] shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#2c3640]">
                    Official Email Desk
                  </h4>
                  <span className="text-xs text-gray-700 font-medium">
                    support@chitramtv.uk
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Automated credentials dispatch runs 24/7 without interruption across all UK subscriptions.
              </p>
            </Card>

          </div>

          {/* Contact Ticket Form with Direct WhatsApp Dispatch */}
          <div className="lg:col-span-7">
            <Card className="p-5 sm:p-8 bg-white border-gray-200 shadow-sm rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-xl sm:text-2xl font-bold text-[#2c3640]">
                  Send an Enquiry via WhatsApp
                </CardTitle>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Connected to Help Desk
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-6">
                Fill in your details below. When you click submit, your inquiry is pre-filled and sent directly to our 24/7 WhatsApp help desk for a rapid reply.
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
                      <option value="Amazon Fire TV Stick">Amazon Fire TV Stick (4K / HD / Lite)</option>
                      <option value="ChitramTV Black Edition C1 Box">ChitramTV Black Edition C1 Box</option>
                      <option value="Android TV / Google TV">Android TV / Google TV (Sony, Philips, TCL)</option>
                      <option value="Samsung Smart TV (Tizen)">Samsung Smart TV (Tizen)</option>
                      <option value="LG Smart TV (webOS)">LG Smart TV (webOS)</option>
                      <option value="Apple TV 4K / iOS">Apple TV 4K / iOS (iPhone/iPad)</option>
                      <option value="Windows PC / Mac">Windows PC / MacBook</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      How Can We Help You?
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Ask about channel availability, renewing your account, Firestick setup, or C1 Box delivery..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#dd0e1c] focus:outline-none focus:ring-1 focus:ring-[#dd0e1c] resize-none shadow-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="w-full font-bold flex items-center justify-center gap-2 min-h-[48px] text-base sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Send Enquiry to WhatsApp Desk</span>
                  </Button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#2c3640]">Enquiry Ready for WhatsApp!</h4>
                    <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-1">
                      Your details for <strong className="text-gray-900">{form.name}</strong> have been formatted. If WhatsApp did not open automatically, tap the button below:
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={whatsAppRedirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-12 px-6 rounded-lg transition-colors shadow-sm min-h-[48px]"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Continue to WhatsApp Desk (07979637777)</span>
                      <ExternalLink className="h-3.5 w-3.5 ml-1" />
                    </a>
                    <Button
                      variant="outline"
                      size="sm"
                      className="min-h-[48px] bg-white border-gray-300 text-gray-800 hover:bg-gray-50 shadow-sm"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: "", email: "", device: "Amazon Fire TV Stick", message: "" });
                      }}
                    >
                      Send Another Message
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

        </div>

        {/* Link to dedicated /contact page */}
        <div className="mt-10 sm:mt-12 text-center">
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

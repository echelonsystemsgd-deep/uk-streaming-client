"use client";

import React, { useState } from "react";
import { Phone, MessageSquare, Mail, Clock, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            WE ARE HERE TO HELP
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            UK Customer Care & Support
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Need device setup assistance, channel advice, or payment confirmation? Reach out to our dedicated British support desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Contact Methods Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="h-10 w-10 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-200 shrink-0">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    WhatsApp Live Chat
                  </h4>
                  <span className="text-xs text-zinc-400 font-medium">
                    Fastest Response (&lt;5 Minutes)
                  </span>
                </div>
              </div>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Message our technical specialists directly on WhatsApp for real-time setup guidance on Firestick, Samsung TV, or Android.
              </p>
              <a
                href="https://wa.me/442079460912"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-semibold text-xs px-4 py-2.5 h-10 w-full transition-colors"
              >
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                <span>Start WhatsApp Chat</span>
              </a>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="h-10 w-10 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-200 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    UK Telephone Helpline
                  </h4>
                  <span className="text-xs text-zinc-400">
                    020 7946 0912
                  </span>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Speak with an advisor directly. Available Monday to Sunday from 8:00 AM to 11:00 PM London time.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="h-10 w-10 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-200 shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    UK Operating Hours
                  </h4>
                  <span className="text-xs text-zinc-400">
                    8:00 AM – 11:00 PM GMT
                  </span>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                7 Days a week including bank holidays. Automated credentials dispatch runs 24/7 without interruption.
              </p>
            </Card>

          </div>

          {/* Contact Ticket Form (Card with exclusive shadow) */}
          <div className="lg:col-span-7">
            <Card className="p-5 sm:p-8 border-border/80">
              <CardTitle className="text-xl sm:text-2xl font-bold text-white mb-1">
                Send an Enquiry to Our UK Team
              </CardTitle>
              <p className="text-xs text-muted-foreground mb-6">
                Fill in your details and we will reply to your email within 1 hour during operating times.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Raj Patel"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-md border border-border bg-background px-3.5 py-3 text-base sm:text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[46px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.co.uk"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-md border border-border bg-background px-3.5 py-3 text-base sm:text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[46px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                      Your Primary TV / Streaming Device
                    </label>
                    <select
                      value={form.device}
                      onChange={(e) => setForm({ ...form, device: e.target.value })}
                      className="w-full rounded-md border border-border bg-background px-3.5 py-3 text-base sm:text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[46px]"
                    >
                      <option value="Firestick">Amazon Fire TV Stick (4K / HD)</option>
                      <option value="AndroidTV">Android TV / Google TV (Sony, TCL, Philips)</option>
                      <option value="AppleTV">Apple TV 4K</option>
                      <option value="Samsung">Samsung Smart TV (Tizen)</option>
                      <option value="LG">LG Smart TV (webOS)</option>
                      <option value="Mobile">iOS / Android Smartphone or Tablet</option>
                      <option value="BoxBundle">Interested in Dedicated 4K IPTV Box Bundle</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                      How Can We Help You?
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Ask about channel availability, broadband compatibility, or setup assistance..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-md border border-border bg-background px-3.5 py-3 text-base sm:text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="w-full font-bold flex items-center justify-center gap-2 min-h-[48px] text-base sm:text-sm"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Message</span>
                  </Button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Thank You, {form.name}!</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Your enquiry has been received by our UK customer team. We will respond to <strong className="text-white">{form.email}</strong> shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="min-h-[44px]"
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

      </div>
    </section>
  );
}

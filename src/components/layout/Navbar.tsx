"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Play, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onSubscribeClick: () => void;
}

export function Navbar({ onSubscribeClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Channels (350+)", href: "#channels" },
    { name: "Why Us", href: "#features" },
    { name: "Plans & Pricing", href: "#plans" },
    { name: "Setup Guide", href: "#how-it-works" },
    { name: "FAQ", href: "#faq" },
    { name: "UK Support", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border/80"
            : "bg-background/80 backdrop-blur-sm border-b border-border/40"
        }`}
      >
        <div className="container mx-auto max-w-7xl flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group select-none">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold transition-transform group-hover:scale-105 shrink-0">
              <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-current ml-0.5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl font-extrabold tracking-tight text-white leading-none">
                  DesiStream
                </span>
                <span className="rounded bg-accent px-1.5 py-0.5 text-[9px] sm:text-[10px] font-extrabold text-accent-foreground tracking-wider leading-none">
                  UK
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-muted-foreground uppercase mt-0.5 leading-none">
                Indian IPTV Network
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              className="text-xs font-semibold text-muted-foreground hover:text-white transition-colors px-3 py-2 min-h-[44px] flex items-center"
            >
              Client Portal
            </a>
            <Button
              variant="default"
              size="default"
              onClick={onSubscribeClick}
              className="font-bold flex items-center gap-1.5 min-h-[44px]"
            >
              <span>Subscribe Now</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={onSubscribeClick}
              className="text-xs font-bold px-3 min-h-[40px]"
            >
              Subscribe
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md p-2.5 text-muted-foreground hover:text-white hover:bg-background-subtle focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 sm:hidden bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-background-elevated border-l border-border p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-white font-bold">
                    <Play className="h-4 w-4 fill-current ml-0.5" />
                  </div>
                  <span className="font-extrabold text-white text-lg">DesiStream UK</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md p-2 text-muted-foreground hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close menu drawer"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Links with large 44px+ touch targets */}
              <nav className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between min-h-[48px] px-3 rounded-md text-base font-semibold text-slate-200 hover:text-white hover:bg-background-subtle transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Drawer Actions */}
            <div className="pt-6 border-t border-border/60 space-y-3">
              <Button
                variant="default"
                size="lg"
                className="w-full justify-center font-bold text-base min-h-[48px]"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSubscribeClick();
                }}
              >
                Subscribe With PayPal
              </Button>
              <a
                href="tel:+442079460912"
                className="flex items-center justify-center gap-2 py-3 text-xs text-muted-foreground hover:text-white min-h-[44px]"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span>UK Helpline: 020 7946 0912</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Play, ChevronRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollLock } from "@/hooks/useScrollLock";

interface NavbarProps {
  onSubscribeClick: () => void;
}

export function Navbar({ onSubscribeClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock background scroll on mobile Safari and WhatsApp in-app browser
  useScrollLock(mobileMenuOpen);

  const navLinks = [
    { name: "Channels (350+)", href: "/channels" },
    { name: "Plans & Pricing", href: "/plans" },
    { name: "Setup Guide", href: "/setup-guide" },
    { name: "Why Us", href: "/why-us" },
    { name: "FAQ", href: "/faq" },
    { name: "Help Desk", href: "/contact" },
  ];

  return (
    <>
      <div className="w-full">
        <div className="container mx-auto max-w-7xl flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold transition-transform group-hover:scale-105 shrink-0 shadow-sm">
              <Play className="h-5 w-5 fill-current ml-0.5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-none">
                  ChitramTV
                </span>
                <span className="rounded bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 text-[10px] font-bold text-zinc-300 tracking-wider leading-none">
                  UK
                </span>
              </div>
              <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mt-1 leading-none">
                Indian TV &amp; 4K Streaming
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Visible at >= 1024px) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-semibold tracking-wide transition-colors py-1 ${
                    isActive
                      ? "text-white border-b-2 border-primary"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Suite: Unified across Desktop, Split-Screen & Mobile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Desk: visible on md and up */}
            <a
              href="https://wa.me/31620897414"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex text-xs font-semibold text-muted-foreground hover:text-white transition-colors px-2.5 py-2 min-h-[44px] items-center gap-1.5"
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
              <span>WhatsApp Desk</span>
            </a>

            {/* Subscribe Button (sm and up) */}
            <Button
              variant="default"
              size="default"
              onClick={onSubscribeClick}
              className="hidden sm:flex font-bold items-center gap-1.5 min-h-[44px] px-4 text-xs sm:text-sm"
            >
              <span>Subscribe Now</span>
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Compact Subscribe on mobile (< 640px) */}
            <Button
              variant="default"
              size="sm"
              onClick={onSubscribeClick}
              className="flex sm:hidden text-xs font-bold px-3 min-h-[38px]"
            >
              Subscribe
            </Button>

            {/* Hamburger Menu Toggle Button (Visible whenever desktop nav is hidden: lg:hidden) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden rounded-lg p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/80 border border-zinc-800/80 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors shrink-0"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Split-Screen Drawer Sidebar Rendered Via React Portal */}
      {mounted && createPortal(
        <div
          className={`fixed inset-0 z-[70] lg:hidden transition-all duration-300 ${
            mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Sidebar */}
          <div
            className={`fixed inset-y-0 right-0 w-[85%] max-w-sm bg-zinc-950 border-l border-zinc-800 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto overscroll-contain transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-white font-bold">
                    <Play className="h-4 w-4 fill-current ml-0.5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-white text-lg">ChitramTV</span>
                    <span className="rounded bg-zinc-800 border border-zinc-700 px-1 py-0.5 text-[9px] font-bold text-zinc-300">
                      UK
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md p-2 text-muted-foreground hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close menu drawer"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Links with large 48px touch targets */}
              <nav className="py-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between min-h-[48px] px-3.5 rounded-lg text-base font-semibold transition-colors select-none ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-zinc-300 hover:text-white hover:bg-zinc-900"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className={`h-4 w-4 ${isActive ? "text-white" : "text-zinc-500"}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Drawer Actions */}
            <div className="pt-6 border-t border-zinc-800 space-y-3">
              <Button
                variant="default"
                size="lg"
                className="w-full justify-center font-bold text-base min-h-[48px]"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSubscribeClick();
                }}
              >
                Order with PayPal
              </Button>
              <a
                href="https://wa.me/31620897414"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 text-xs text-muted-foreground hover:text-white min-h-[44px] bg-zinc-900 rounded-lg border border-zinc-800"
              >
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                <span>WhatsApp: +31 6 20897414</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

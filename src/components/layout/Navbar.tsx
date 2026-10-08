"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  Phone,
  MessageSquare,
  Tv,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useScrollLock } from "@/hooks/useScrollLock";

interface NavbarProps {
  onSubscribeClick?: () => void;
}

export function Navbar({ onSubscribeClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, totalPrice, setIsCartDrawerOpen } = useCart();

  // Close menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useScrollLock(mobileMenuOpen);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/buy-now?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Exact 7 links matching chitramtv.eu (+ Home and Channels)
  const menuLinks = [
    { name: "HOME", href: "/" },
    { name: "BUY NOW", href: "/buy-now", highlight: true },
    { name: "CHANNELS", href: "/channels" },
    { name: "FEATURES", href: "/features" },
    { name: "DOWNLOAD", href: "/download" },
    { name: "SETUP GUIDE", href: "/setup-guide" },
    { name: "ABOUT US", href: "/about" },
    { name: "TERMS AND CONDITION", href: "/terms" },
    { name: "CONTACT US", href: "/contact" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      {/* Middle Bar: Brand Logo + Search + Cart (Journal 3 Classic Header) */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 select-none shrink-0 group">
          <div className="relative h-11 w-11 sm:h-13 sm:w-13 shrink-0">
            <Image
              src="/Logo.png"
              alt="ChitramTV UK"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#dd0e1c]">
                CHITRAM<span className="text-[#2c3640]">TV</span>
              </span>
              <span className="bg-[#dd0e1c] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                UK
              </span>
            </div>
            <span className="text-[10px] font-semibold text-gray-500 tracking-wider uppercase mt-0.5 hidden xs:block">
              500+ Channels &bull; 14-Day DVR
            </span>
          </div>
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-lg mx-4">
          <form onSubmit={handleSearchSubmit} className="w-full flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all Indian channels, boxes, renewals..."
              className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-[#dd0e1c] focus:border-[#dd0e1c]"
            />
            <button
              type="submit"
              className="bg-[#dd0e1c] hover:bg-[#b00b16] text-white px-5 py-2 rounded-r flex items-center justify-center transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Suite: Cart Button + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* Cart Button */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-2 rounded text-left transition-colors"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#dd0e1c] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <div className="hidden sm:block text-xs">
              <div className="text-gray-500 font-medium">Cart</div>
              <div className="text-gray-900 font-bold">
                {totalItems} item(s) - £{totalPrice.toFixed(2)}
              </div>
            </div>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Primary Navigation Menu Bar (Journal 3 Dark Slate Bar) */}
      <div className="hidden lg:block bg-[#2c3640] border-t border-gray-700 text-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex items-center overflow-x-auto scrollbar-none">
            {menuLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xs font-bold tracking-wider uppercase px-4 py-3 whitespace-nowrap transition-colors flex items-center gap-1 ${
                    isActive
                      ? "bg-[#dd0e1c] text-white"
                      : item.highlight
                      ? "text-[#fdc22d] hover:bg-[#3a4754] hover:text-white"
                      : "text-gray-200 hover:bg-[#3a4754] hover:text-[#fdc22d]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#2c3640] text-white flex flex-col shadow-2xl">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <span className="font-bold text-sm tracking-wider uppercase text-gray-200">
                Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded text-gray-300 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="p-4 border-b border-gray-700">
              <form onSubmit={handleSearchSubmit} className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search channels..."
                  className="w-full px-3 py-2 text-xs bg-gray-800 border border-gray-600 rounded-l text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#dd0e1c] text-white px-3 py-2 rounded-r"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex-1 overflow-y-auto divide-y divide-gray-700/50">
              {menuLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-5 py-3.5 text-xs font-bold tracking-wider uppercase transition-colors ${
                      isActive
                        ? "bg-[#dd0e1c] text-white"
                        : item.highlight
                        ? "text-[#fdc22d] hover:bg-gray-700"
                        : "text-gray-200 hover:bg-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Footer Help */}
            <div className="p-4 bg-gray-900/60 border-t border-gray-700 text-xs space-y-2">
              <a
                href="tel:07979637777"
                className="flex items-center gap-2 text-white font-semibold hover:text-[#fdc22d]"
              >
                <Phone className="w-4 h-4 text-[#fdc22d]" />
                <span>Call Helpline: 07979637777</span>
              </a>
              <a
                href="https://wa.me/447979637777"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp 24/7 Desk</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

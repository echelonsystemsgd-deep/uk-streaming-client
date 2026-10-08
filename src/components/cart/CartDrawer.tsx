"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useScrollLock } from "@/hooks/useScrollLock";

export function CartDrawer() {
  const {
    items,
    totalItems,
    totalPrice,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
  } = useCart();

  // Prevent background scrolling when CartDrawer is open
  useScrollLock(isCartDrawerOpen);

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden touch-none" style={{ overscrollBehavior: "contain" }}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity backdrop-blur-sm touch-none"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-auto">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col overscroll-contain">
          {/* Header */}
          <div className="p-4 bg-[#2c3640] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#fdc22d]" />
              <h2 className="text-lg font-bold">Shopping Cart ({totalItems})</h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1 rounded-full text-gray-300 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Your shopping cart is empty!</p>
                <Link
                  href="/buy-now"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="mt-4 inline-block bg-[#dd0e1c] text-white px-5 py-2 rounded text-sm font-bold uppercase hover:bg-[#b00b16]"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.plan.id} className="py-4 flex gap-3 items-center">
                  <div className="relative w-16 h-16 bg-gray-50 border rounded flex-shrink-0 p-1">
                    <Image
                      src={item.plan.image}
                      alt={item.plan.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
                      {item.plan.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      £{item.plan.price.toFixed(2)} each
                    </p>
                    {item.accountIdentifier && (
                      <p className="text-xs text-blue-600 truncate">
                        ID: {item.accountIdentifier}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => updateQuantity(item.plan.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.plan.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100 font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-bold text-gray-900 ml-auto">
                        £{(item.plan.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.plan.id)}
                        className="text-gray-400 hover:text-red-600 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 bg-gray-50 border-t space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                <span>Sub-Total:</span>
                <span>£{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-gray-900 border-t pt-2">
                <span>Total:</span>
                <span className="text-[#dd0e1c]">£{totalPrice.toFixed(2)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full bg-[#dd0e1c] hover:bg-[#b00b16] text-white text-center py-2.5 rounded font-bold uppercase text-xs flex items-center justify-center gap-1 shadow-md transition-colors"
                >
                  Checkout <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/buy-now"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full bg-[#2c3640] hover:bg-[#3a4754] text-white text-center py-2.5 rounded font-bold uppercase text-xs flex items-center justify-center transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

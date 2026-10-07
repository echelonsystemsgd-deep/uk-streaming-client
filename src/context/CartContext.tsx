"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PricingPlan } from "@/data/plans";

export interface CartItem {
  plan: PricingPlan;
  quantity: number;
  deviceType?: string;
  accountIdentifier?: string; // For renewal lines
}

interface CartContextType {
  items: CartItem[];
  addToCart: (plan: PricingPlan, options?: { deviceType?: string; accountIdentifier?: string }) => void;
  removeFromCart: (planId: string) => void;
  updateQuantity: (planId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("chitramtv_uk_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed to read cart from localStorage", e);
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem("chitramtv_uk_cart", JSON.stringify(items));
    } catch (e) {
      console.warn("Failed to save cart to localStorage", e);
    }
  }, [items]);

  const addToCart = (plan: PricingPlan, options?: { deviceType?: string; accountIdentifier?: string }) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.plan.id === plan.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        if (options?.accountIdentifier) {
          next[existingIndex].accountIdentifier = options.accountIdentifier;
        }
        return next;
      }
      return [
        ...prev,
        {
          plan,
          quantity: 1,
          deviceType: options?.deviceType || "Amazon Fire TV Stick",
          accountIdentifier: options?.accountIdentifier || "",
        },
      ];
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (planId: string) => {
    setItems((prev) => prev.filter((item) => item.plan.id !== planId));
  };

  const updateQuantity = (planId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(planId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.plan.id === planId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.plan.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

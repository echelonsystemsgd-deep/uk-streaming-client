"use client";

import { useEffect, useRef } from "react";

/**
 * Robust scroll lock hook engineered for iOS Safari and in-app webviews (WhatsApp, Instagram).
 * Standard `document.body.style.overflow = "hidden"` fails on iOS touch events.
 * This hook employs the `position: fixed` scroll offset retention technique.
 */
export function useScrollLock(lock: boolean) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (lock) {
      // Record exact scroll position
      scrollYRef.current = window.scrollY;

      // Lock both documentElement and body
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      
      // Compensate for scrollbar layout shift on desktop browsers
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    } else {
      // Restore styles when unlocked
      const originalY = scrollYRef.current;
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      // Restore scroll offset smoothly without triggering animation loops
      window.scrollTo({
        top: originalY,
        behavior: "instant" as ScrollBehavior,
      });
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [lock]);
}

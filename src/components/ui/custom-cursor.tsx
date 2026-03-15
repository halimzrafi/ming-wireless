"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only show on desktop
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      targetRef.current = { x: e.clientX, y: e.clientY };

      // Magnetic snap to CTAs
      const buttons = document.querySelectorAll("a, button, [role='button']");
      let snapped = false;

      buttons.forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

        if (dist < 60) {
          targetRef.current = {
            x: centerX + (e.clientX - centerX) * 0.3,
            y: centerY + (e.clientY - centerY) * 0.3,
          };
          snapped = true;
        }
      });

      setIsHovering(snapped);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Animation loop with lerp
    let rafId: number;
    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${posRef.current.x}px`;
        cursorRef.current.style.top = `${posRef.current.y}px`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    // Hide default cursor
    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.textContent = "a, button, [role='button'], input, textarea, select { cursor: none !important; }";
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
      document.body.style.cursor = "";
      style.remove();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor hidden lg:block ${isHovering ? "hovering" : ""}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    />
  );
}

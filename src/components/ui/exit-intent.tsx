"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";
import Link from "next/link";

export function ExitIntent() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("exit-intent-shown");
    if (hasShown) return;

    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 5 && !hasShown) {
        setIsOpen(true);
        sessionStorage.setItem("exit-intent-shown", "true");
      }
    };

    document.addEventListener("mouseout", handleMouseOut);
    return () => document.removeEventListener("mouseout", handleMouseOut);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-full max-w-md mx-4"
          >
            <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-8 text-center relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-[#94A3B8]" />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-[#2563EB]/10 flex items-center justify-center mx-auto mb-5">
                <Zap className="w-8 h-8 text-[#3B82F6]" />
              </div>

              <h3 className="text-2xl font-black mb-2">Before You Go!</h3>
              <p className="text-[#94A3B8] text-sm mb-6 leading-relaxed">
                Get a free diagnostic estimate for your device. No commitment, no pressure — just an honest quote.
              </p>

              <Link
                href="/quote"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#2563EB] hover:bg-[#3B82F6] text-white font-bold rounded-full transition-all glow-shadow mb-3"
              >
                Get Free Estimate
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-[#94A3B8] hover:text-white transition-colors"
              >
                No thanks, I&apos;ll pass
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

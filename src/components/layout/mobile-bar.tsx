"use client";

import { Phone, MessageCircle, Zap } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import Link from "next/link";

export function MobileBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-[#0F172A]/95 backdrop-blur-xl border-t border-white/10 px-2 py-2 safe-area-pb">
        <div className="flex items-center justify-around gap-2">
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1E293B] text-white text-sm font-semibold transition-all active:scale-95"
          >
            <Phone className="w-4 h-4" />
            Call
          </a>
          <a
            href={BUSINESS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#22C55E] text-white text-sm font-semibold transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <Link
            href="/quote"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2563EB] text-white text-sm font-semibold transition-all active:scale-95 glow-shadow"
          >
            <Zap className="w-4 h-4" />
            Quick Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { FixFlow, FixFlowModal } from "@/components/fix-in-3-taps/fix-flow";
import { ServiceCards } from "@/components/home/service-cards";
import { HowItWorks } from "@/components/home/how-it-works";
import { LiveCounters } from "@/components/home/live-counters";
import { Reviews } from "@/components/home/reviews";
import { CorporateSection } from "@/components/home/corporate-section";
import { RepairTracker } from "@/components/home/repair-tracker";
import { MapSection } from "@/components/home/map-section";
import { Footer } from "@/components/layout/footer";
import { ExitIntent } from "@/components/ui/exit-intent";
import { motion } from "framer-motion";

export default function HomePage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <>
      <Hero />
      <TrustBar />

      {/* Fix in 3 Taps — inline on mobile */}
      <section className="py-16 lg:hidden">
        <div className="max-w-lg mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black tracking-tight">
              Get Your Quote in <span className="text-[#0891B2]">3 Taps</span>
            </h2>
            <p className="text-sm text-[#94A3B8] mt-2">No waiting. No phone tag. Instant pricing.</p>
          </div>
          <FixFlow />
        </div>
      </section>

      {/* Desktop: CTA to open modal */}
      <section className="hidden lg:block py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-between bg-gradient-to-r from-[#1E293B] to-[#1E293B]/50 border border-white/5 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-2xl font-black tracking-tight">
                Get Your Quote in <span className="text-[#0891B2]">3 Taps</span>
              </h2>
              <p className="text-[#94A3B8] mt-1">Select your device, tap the damage, get instant pricing.</p>
            </div>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-8 py-3.5 bg-[#0891B2] hover:bg-[#06B6D4] text-white font-bold rounded-full transition-all glow-shadow hover:scale-[1.04]"
            >
              Start Now
            </button>
          </motion.div>
        </div>
      </section>

      <FixFlowModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />

      <ServiceCards />
      <HowItWorks />
      <LiveCounters />
      <Reviews />
      <CorporateSection />
      <RepairTracker />
      <MapSection />
      <Footer />
      <ExitIntent />

      {/* Bottom padding for mobile bar */}
      <div className="h-20 lg:hidden" />
    </>
  );
}

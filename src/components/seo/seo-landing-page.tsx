"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FixFlow } from "@/components/fix-in-3-taps/fix-flow";
import { TrustBar } from "@/components/home/trust-bar";
import { MapSection } from "@/components/home/map-section";
import { Phone, Shield, Clock, CheckCircle2 } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

interface SEOLandingPageProps {
  h1: string;
  subtitle: string;
  intro: string;
  services: { name: string; price: string; time: string }[];
  models: string[];
}

export function SEOLandingPage({ h1, subtitle, intro, services, models }: SEOLandingPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-[#0F172A] to-[#1E293B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                {h1.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-[#0891B2]">{h1.split(" ").slice(-1)}</span>
              </h1>
              <p className="text-xl text-[#94A3B8] mt-3 font-medium">{subtitle}</p>
              <p className="text-[#94A3B8] mt-6 leading-relaxed">{intro}</p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#0891B2] hover:bg-[#06B6D4] text-white font-bold rounded-full transition-all glow-shadow"
                >
                  Get Instant Quote
                </Link>
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full transition-all hover:bg-white/10"
                >
                  <Phone className="w-4 h-4" />
                  {BUSINESS.phone}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FixFlow />
            </motion.div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Services table */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black tracking-tight mb-8">
              Our <span className="text-[#0891B2]">Pricing</span>
            </h2>

            <div className="bg-[#1E293B]/50 border border-white/5 rounded-2xl overflow-hidden">
              {services.map((service, i) => (
                <div
                  key={service.name}
                  className={`flex items-center justify-between px-6 py-4 ${
                    i < services.length - 1 ? "border-b border-white/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                    <span className="font-medium text-sm">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-[#94A3B8] hidden sm:inline">{service.time}</span>
                    <span className="text-[#22C55E] font-bold">{service.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Supported models */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black tracking-tight mb-6">
              Models We <span className="text-[#0891B2]">Repair</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {models.map((model) => (
                <span
                  key={model}
                  className="px-4 py-2 bg-[#1E293B]/50 border border-white/5 rounded-full text-sm text-[#94A3B8]"
                >
                  {model}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Why choose us */}
          <motion.div
            className="mt-16 grid sm:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Clock, title: "Same-Day Service", desc: "Most repairs completed while you wait" },
              { icon: Shield, title: "Original Parts", desc: "100% genuine OEM components only" },
              { icon: CheckCircle2, title: "Lifetime Warranty", desc: "Every repair backed for life" },
            ].map((item) => (
              <div key={item.title} className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-6 text-center">
                <item.icon className="w-8 h-8 text-[#06B6D4] mx-auto mb-3" />
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-[#94A3B8]">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <MapSection />
    </>
  );
}

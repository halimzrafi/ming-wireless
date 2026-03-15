"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import { Monitor, Battery, Droplets, Laptop, Plug, Package, Clock, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FixFlow } from "@/components/fix-in-3-taps/fix-flow";
import { Footer } from "@/components/layout/footer";

const serviceIcons: Record<string, React.ElementType> = {
  screen: Monitor,
  battery: Battery,
  water: Droplets,
  laptop: Laptop,
  charging: Plug,
  mail: Package,
};

export function ServicesPageClient() {
  return (
    <>
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
              Our Repair <span className="text-[#0891B2]">Services</span>
            </h1>
            <p className="text-[#94A3B8] mt-3 max-w-lg mx-auto">
              From cracked screens to water damage — we fix it all with original parts and same-day turnaround.
            </p>
          </motion.div>

          <div className="space-y-8">
            {SERVICES.map((service, i) => {
              const Icon = serviceIcons[service.icon];
              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-6 lg:p-8 scroll-mt-24"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.45 }}
                >
                  <div className="grid lg:grid-cols-3 gap-6 items-center">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#0891B2]/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-[#06B6D4]" />
                        </div>
                        <h2 className="text-2xl font-bold">{service.title}</h2>
                      </div>
                      <p className="text-[#94A3B8] leading-relaxed mb-4">{service.description}</p>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 text-[#94A3B8]">
                          <Clock className="w-4 h-4" />
                          {service.time}
                        </div>
                        <div className="flex items-center gap-2 text-[#94A3B8]">
                          <Shield className="w-4 h-4" />
                          Lifetime Warranty
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start lg:items-end gap-3">
                      <p className="text-3xl font-black">
                        <span className="text-sm font-normal text-[#94A3B8]">From </span>
                        ${service.fromPrice}
                      </p>
                      <Link
                        href="/quote"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold rounded-full transition-all glow-shadow"
                      >
                        {service.cta}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Inline Fix Flow */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black tracking-tight">
                Get Your <span className="text-[#0891B2]">Instant Quote</span>
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <FixFlow />
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
      <div className="h-20 lg:hidden" />
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import { Monitor, Battery, Droplets, Laptop, Plug, Package } from "lucide-react";
import Link from "next/link";

const serviceIcons: Record<string, React.ElementType> = {
  screen: Monitor,
  battery: Battery,
  water: Droplets,
  laptop: Laptop,
  charging: Plug,
  mail: Package,
};

export function ServiceCards() {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <span className="text-[#06B6D4] text-sm font-semibold tracking-wider uppercase">Our Services</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 tracking-tight">
            Expert Repairs for
            <br />
            <span className="text-[#0891B2]">Every Device</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <motion.div
                key={service.id}
                className="bg-[#1E293B]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-5 hover:border-[#0891B2]/30 transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#0891B2]/10 flex items-center justify-center mb-3 group-hover:bg-[#0891B2]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#06B6D4]" />
                </div>
                <h3 className="text-base font-bold mb-1.5">{service.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-3">{service.description}</p>
                <div className="flex items-center gap-3 mb-4 text-sm">
                  <span className="text-[#94A3B8]">⏱ {service.time}</span>
                  <span className="text-[#22C55E] font-semibold">From ${service.fromPrice}</span>
                </div>
                <Link
                  href="/quote"
                  className="inline-flex items-center px-5 py-2.5 bg-white/5 hover:bg-[#0891B2] border border-white/10 hover:border-[#0891B2] text-sm font-semibold rounded-full transition-all duration-200"
                >
                  {service.cta}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

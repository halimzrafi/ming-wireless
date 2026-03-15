"use client";

import { motion } from "framer-motion";
import { Building2, ShieldCheck, Users, Truck } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: Building2, title: "Corporate Accounts", description: "Dedicated repair programs for businesses of all sizes" },
  { icon: ShieldCheck, title: "Warranty Repairs", description: "Authorized warranty repair for national retailers across Canada" },
  { icon: Users, title: "Fleet Management", description: "Volume device repair for teams and organizations" },
  { icon: Truck, title: "Pickup & Delivery", description: "Convenient service for corporate clients in the GTA" },
];

export function CorporateSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <span className="text-[#06B6D4] text-sm font-semibold tracking-wider uppercase">For Business</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 tracking-tight mb-4">
              Trusted by Businesses
              <br />
              <span className="text-[#0891B2]">Across Canada</span>
            </h2>
            <p className="text-[#94A3B8] leading-relaxed mb-8">
              From startups to national retailers, Ming Wireless provides reliable, fast device repair
              at scale. Corporate accounts get priority service, volume pricing, and dedicated support.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-full transition-all"
            >
              Contact for Business Pricing
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="p-5 rounded-2xl bg-[#1E293B]/50 border border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
              >
                <feature.icon className="w-6 h-6 text-[#06B6D4] mb-3" />
                <h3 className="text-sm font-bold mb-1">{feature.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

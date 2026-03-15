"use client";

import { motion } from "framer-motion";
import { Shield, Award, Users, Building2, Wrench, Star, CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

const values = [
  { icon: Shield, title: "Quality First", description: "We never compromise on parts quality. Every component we use is 100% genuine OEM." },
  { icon: Award, title: "Lifetime Warranty", description: "We stand behind our work. Every repair comes with our lifetime warranty — no questions asked." },
  { icon: Users, title: "Customer Focus", description: "Transparent pricing, honest diagnostics, and no upselling. We treat every device like our own." },
  { icon: Wrench, title: "Expert Technicians", description: "Our team is certified and continuously trained on the latest devices and repair techniques." },
];

const milestones = [
  { year: "2019", title: "Founded", description: "Opened our doors at 250 Dundas St W in downtown Toronto" },
  { year: "2020", title: "Corporate Partnerships", description: "Became authorized warranty repair provider for national retailers" },
  { year: "2022", title: "10,000 Repairs", description: "Reached our 10,000th successful device repair" },
  { year: "2024", title: "Mail-In Service", description: "Launched Canada-wide mail-in repair service" },
];

export function AboutPageClient() {
  return (
    <>
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              About <span className="text-[#2563EB]">Ming Wireless</span>
            </h1>
            <p className="text-xl text-[#94A3B8] mt-4 max-w-2xl mx-auto leading-relaxed">
              Since 2019, we&apos;ve been downtown Toronto&apos;s go-to repair shop for phones, tablets, and laptops.
              Expert service, original parts, and a commitment to getting your device back to you — fast.
            </p>
          </motion.div>

          {/* Values */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
              >
                <value.icon className="w-8 h-8 text-[#3B82F6] mb-4" />
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black tracking-tight text-center mb-12">
              Our <span className="text-[#2563EB]">Journey</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  className="relative bg-[#1E293B]/50 border border-white/5 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-4xl font-black text-[#2563EB]/20">{milestone.year}</span>
                  <h3 className="text-lg font-bold mt-2">{milestone.title}</h3>
                  <p className="text-sm text-[#94A3B8] mt-1">{milestone.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* B2B Credentials */}
          <motion.div
            className="bg-gradient-to-r from-[#1E293B] to-[#1E293B]/50 border border-white/5 rounded-2xl p-8 lg:p-12 mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-[#3B82F6]" />
                  <span className="text-[#3B82F6] text-sm font-semibold tracking-wider uppercase">Corporate & Warranty</span>
                </div>
                <h2 className="text-3xl font-black tracking-tight mb-4">
                  Authorized Warranty Repair Partner
                </h2>
                <p className="text-[#94A3B8] leading-relaxed mb-6">
                  Ming Wireless is an authorized warranty repair provider for national retailers across Canada.
                  We handle corporate device fleets, warranty claims, and volume repairs with enterprise-grade service levels.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-[#2563EB] hover:bg-[#3B82F6] text-white font-semibold rounded-full transition-all glow-shadow"
                >
                  Partner With Us
                </Link>
              </div>
              <div className="space-y-3">
                {["Authorized warranty repair centre", "Corporate fleet management", "Volume pricing available", "Priority turnaround for business clients", "Dedicated account management"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Awards / Media placeholder */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black tracking-tight mb-4">
              Awards & <span className="text-[#2563EB]">Media</span>
            </h2>
            <p className="text-[#94A3B8] mb-8">Recognition and features</p>
            {/* Placeholder for media logos */}
            <div className="flex flex-wrap items-center justify-center gap-8">
              {["Top Rated 2024", "Google Verified", "BBB Accredited", "Best of Toronto"].map((badge) => (
                <div
                  key={badge}
                  className="px-6 py-3 bg-[#1E293B]/50 border border-white/5 rounded-xl text-sm text-[#94A3B8] font-medium"
                >
                  <Star className="w-4 h-4 inline-block mr-2 text-[#3B82F6]" />
                  {badge}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
      <div className="h-20 lg:hidden" />
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { MapPin, Search, Wrench } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Walk In",
    description: "Visit us at 250 Dundas St W in downtown Toronto. No appointment needed — just walk in during business hours.",
    number: "01",
  },
  {
    icon: Search,
    title: "Free Diagnosis",
    description: "Our technicians diagnose your device on the spot. You get a transparent quote before we touch anything.",
    number: "02",
  },
  {
    icon: Wrench,
    title: "Same-Day Repair",
    description: "Most repairs are done in under an hour. We use only original parts and back everything with a lifetime warranty.",
    number: "03",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-24 bg-[#1E293B]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <span className="text-[#06B6D4] text-sm font-semibold tracking-wider uppercase">How It Works</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 tracking-tight">
            Three Steps to a
            <br />
            <span className="text-[#0891B2]">Like-New Device</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#0891B2]/30 to-transparent" />
              )}
              <div className="relative">
                <span className="absolute -top-3 -right-3 text-6xl font-black text-white/[0.03]">{step.number}</span>
                <div className="w-20 h-20 rounded-2xl bg-[#0891B2]/10 flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-9 h-9 text-[#06B6D4]" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

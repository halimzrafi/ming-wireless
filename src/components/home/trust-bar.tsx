"use client";

import { motion } from "framer-motion";
import { Star, Clock, Shield, Award } from "lucide-react";

const trustItems = [
  { icon: Star, label: "Google 4.8★", sublabel: "247+ Reviews" },
  { icon: Clock, label: "5+ Years", sublabel: "In Business" },
  { icon: Shield, label: "Original Parts", sublabel: "100% Genuine" },
  { icon: Award, label: "Lifetime Warranty", sublabel: "On All Repairs" },
];

export function TrustBar() {
  return (
    <section className="relative py-6 bg-[#1E293B]/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-3 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#0891B2]/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-[#06B6D4]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{item.label}</p>
                <p className="text-xs text-[#94A3B8]">{item.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Package, CheckCircle2, Wrench, Truck } from "lucide-react";

const trackerSteps = [
  { icon: Package, label: "Received", status: "complete" },
  { icon: Wrench, label: "Repairing", status: "active" },
  { icon: CheckCircle2, label: "Testing", status: "pending" },
  { icon: Truck, label: "Ready", status: "pending" },
];

export function RepairTracker() {
  return (
    <section className="py-20 lg:py-24 bg-[#1E293B]/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#3B82F6] text-sm font-semibold tracking-wider uppercase">Coming Soon</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 tracking-tight">
            Track Your Repair <span className="text-[#2563EB]">Live</span>
          </h2>
          <p className="text-[#94A3B8] mt-3 max-w-lg mx-auto">
            Your device, tracked live — from drop-off to done. Get real-time status updates on your repair.
          </p>
        </motion.div>

        <motion.div
          className="bg-[#1E293B] border border-white/5 rounded-2xl p-6 lg:p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Sample tracker */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-[#94A3B8]">Repair #MW-2847</p>
              <p className="font-bold">iPhone 15 Pro — Screen Replacement</p>
            </div>
            <span className="px-3 py-1 bg-[#2563EB]/10 text-[#3B82F6] text-xs font-semibold rounded-full">
              In Progress
            </span>
          </div>

          <div className="flex items-center justify-between">
            {trackerSteps.map((s, i) => (
              <div key={s.label} className="flex-1 flex flex-col items-center relative">
                {i < trackerSteps.length - 1 && (
                  <div className={`absolute top-5 left-[55%] w-full h-0.5 ${
                    s.status === "complete" ? "bg-[#22C55E]" : "bg-white/10"
                  }`} />
                )}
                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                  s.status === "complete" ? "bg-[#22C55E]" :
                  s.status === "active" ? "bg-[#2563EB] ring-4 ring-[#2563EB]/20" :
                  "bg-white/10"
                }`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xs mt-2 font-medium ${
                  s.status === "active" ? "text-[#3B82F6]" :
                  s.status === "complete" ? "text-[#22C55E]" :
                  "text-[#94A3B8]"
                }`}>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

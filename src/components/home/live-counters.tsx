"use client";

import { useEffect, useRef, useState } from "react";
import { CountUp } from "countup.js";
import { motion } from "framer-motion";
import { Wrench, Clock, Calendar } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}

function Counter({ end, suffix = "", label, sublabel, icon: Icon }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const countUp = new CountUp(ref.current!, end, {
            duration: 2,
            separator: ",",
            suffix,
            useEasing: true,
          });
          countUp.start();
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, suffix, hasAnimated]);

  return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/10 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-7 h-7 text-[#3B82F6]" />
      </div>
      <p className="text-4xl sm:text-5xl font-black tracking-tight">
        <span ref={ref}>0</span>
      </p>
      <p className="text-base font-semibold mt-1">{label}</p>
      <p className="text-sm text-[#94A3B8]">{sublabel}</p>
    </div>
  );
}

export function LiveCounters() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-transparent via-[#1E293B]/30 to-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <Counter
            end={BUSINESS.repairsCompleted}
            suffix="+"
            label="Repairs Completed"
            sublabel="And counting"
            icon={Wrench}
          />
          <Counter
            end={45}
            label="Minute Avg Repair"
            sublabel="Most repairs same-day"
            icon={Clock}
          />
          {/* Static value for V1 — wire to booking calendar in V2 */}
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#22C55E]/10 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-7 h-7 text-[#22C55E]" />
            </div>
            <p className="text-4xl sm:text-5xl font-black tracking-tight text-[#22C55E]">6</p>
            <p className="text-base font-semibold mt-1">Same-Day Slots</p>
            <p className="text-sm text-[#94A3B8]">Remaining today</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

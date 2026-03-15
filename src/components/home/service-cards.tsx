"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/constants";
import { Monitor, Battery, Droplets, Laptop, Plug, Package } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const serviceIcons: Record<string, React.ElementType> = {
  screen: Monitor,
  battery: Battery,
  water: Droplets,
  laptop: Laptop,
  charging: Plug,
  mail: Package,
};

function ServiceCard({ service, index }: { service: typeof SERVICES[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
      card.style.transition = "transform 0.5s ease";
    };

    const handleMouseEnter = () => {
      card.style.transition = "none";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const Icon = serviceIcons[service.icon];

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 w-[300px] lg:w-auto bg-[#1E293B]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-[#2563EB]/30 transition-colors group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.45 }}
      style={{ willChange: "transform" }}
    >
      <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 flex items-center justify-center mb-4 group-hover:bg-[#2563EB]/20 transition-colors">
        <Icon className="w-6 h-6 text-[#3B82F6]" />
      </div>
      <h3 className="text-lg font-bold mb-2">{service.title}</h3>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">{service.description}</p>
      <div className="flex items-center gap-4 mb-5 text-sm">
        <span className="text-[#94A3B8]">⏱ {service.time}</span>
        <span className="text-[#22C55E] font-semibold">From ${service.fromPrice}</span>
      </div>
      <Link
        href="/quote"
        className="inline-flex items-center px-5 py-2.5 bg-white/5 hover:bg-[#2563EB] border border-white/10 hover:border-[#2563EB] text-sm font-semibold rounded-full transition-all duration-200"
      >
        {service.cta}
      </Link>
    </motion.div>
  );
}

export function ServiceCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const scrollEl = scrollRef.current;
    const container = containerRef.current;
    if (!scrollEl || !container) return;

    const totalScroll = scrollEl.scrollWidth - window.innerWidth + 100;

    gsap.to(scrollEl, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top 15%",
        end: () => `+=${totalScroll}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === container) t.kill();
      });
    };
  }, []);

  return (
    <section className="py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <span className="text-[#3B82F6] text-sm font-semibold tracking-wider uppercase">Our Services</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 tracking-tight">
            Expert Repairs for
            <br />
            <span className="text-[#2563EB]">Every Device</span>
          </h2>
        </motion.div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 grid gap-4">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>

      {/* Desktop: horizontal pinned scroll */}
      <div ref={containerRef} className="hidden lg:block">
        <div ref={scrollRef} className="horizontal-scroll-section pl-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

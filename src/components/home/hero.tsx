"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// Generate sprite frames programmatically using Canvas
function generateSpriteFrames(count: number): HTMLCanvasElement[] {
  const frames: HTMLCanvasElement[] = [];

  for (let i = 0; i < count; i++) {
    const canvas = document.createElement("canvas");
    canvas.width = 360;
    canvas.height = 720;
    const ctx = canvas.getContext("2d")!;
    const progress = i / (count - 1); // 0 = fully cracked, 1 = fully repaired

    // Phone body
    const radius = 32;
    ctx.beginPath();
    ctx.roundRect(20, 20, 320, 680, radius);
    ctx.fillStyle = "#1a1a2e";
    ctx.fill();
    ctx.strokeStyle = progress > 0.9 ? "#2563EB" : "#333";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Screen area
    ctx.beginPath();
    ctx.roundRect(30, 60, 300, 600, 16);
    const screenGrad = ctx.createLinearGradient(30, 60, 330, 660);
    screenGrad.addColorStop(0, progress > 0.5 ? "#1e293b" : "#0d1117");
    screenGrad.addColorStop(1, progress > 0.5 ? "#0f172a" : "#090c10");
    ctx.fillStyle = screenGrad;
    ctx.fill();

    // Crack lines (fade out as progress increases)
    const crackOpacity = Math.max(0, 1 - progress * 1.5);
    if (crackOpacity > 0) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${crackOpacity * 0.6})`;
      ctx.lineWidth = 1.5;

      // Main crack from impact point
      const impactX = 180 + Math.sin(progress * 2) * 10;
      const impactY = 280;

      // Radial cracks
      const crackPaths = [
        [{ x: impactX, y: impactY }, { x: 80, y: 120 }],
        [{ x: impactX, y: impactY }, { x: 300, y: 150 }],
        [{ x: impactX, y: impactY }, { x: 60, y: 400 }],
        [{ x: impactX, y: impactY }, { x: 310, y: 500 }],
        [{ x: impactX, y: impactY }, { x: 150, y: 600 }],
        [{ x: impactX, y: impactY }, { x: 280, y: 350 }],
        [{ x: impactX, y: impactY }, { x: 100, y: 250 }],
      ];

      crackPaths.forEach((path) => {
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        // Add jitter to crack lines
        const midX = (path[0].x + path[1].x) / 2 + (Math.random() - 0.5) * 30;
        const midY = (path[0].y + path[1].y) / 2 + (Math.random() - 0.5) * 30;
        ctx.quadraticCurveTo(midX, midY, path[1].x, path[1].y);
        ctx.stroke();
      });

      // Spider web pattern around impact
      for (let r = 30; r < 120; r += 30) {
        ctx.beginPath();
        ctx.arc(impactX, impactY, r * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${crackOpacity * 0.2})`;
        ctx.stroke();
      }
    }

    // Repair glow effect (fades in as progress increases)
    if (progress > 0.3) {
      const glowOpacity = (progress - 0.3) * 1.4;
      const glowGrad = ctx.createRadialGradient(180, 360, 0, 180, 360, 200);
      glowGrad.addColorStop(0, `rgba(37, 99, 235, ${glowOpacity * 0.3})`);
      glowGrad.addColorStop(0.5, `rgba(37, 99, 235, ${glowOpacity * 0.1})`);
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(30, 60, 300, 600);
    }

    // Screen content (appears as repair progresses) — pristine brand-new phone look
    if (progress > 0.5) {
      const contentOpacity = Math.min(1, (progress - 0.5) * 2);

      // Vibrant wallpaper gradient
      const wallGrad = ctx.createLinearGradient(30, 60, 330, 660);
      wallGrad.addColorStop(0, `rgba(37, 99, 235, ${contentOpacity * 0.5})`);
      wallGrad.addColorStop(0.4, `rgba(99, 102, 241, ${contentOpacity * 0.4})`);
      wallGrad.addColorStop(0.7, `rgba(139, 92, 246, ${contentOpacity * 0.35})`);
      wallGrad.addColorStop(1, `rgba(15, 23, 42, ${contentOpacity * 0.6})`);
      ctx.fillStyle = wallGrad;
      ctx.beginPath();
      ctx.roundRect(30, 60, 300, 600, 16);
      ctx.fill();

      // Status bar
      ctx.fillStyle = `rgba(248, 250, 252, ${contentOpacity})`;
      ctx.font = "bold 13px system-ui";
      ctx.fillText("9:41", 50, 86);
      ctx.fillText("100%", 275, 86);

      // WiFi / signal dots
      ctx.fillStyle = `rgba(248, 250, 252, ${contentOpacity * 0.8})`;
      for (let d = 0; d < 4; d++) {
        ctx.beginPath();
        ctx.roundRect(250 + d * 6, 80 - d * 2, 4, 4 + d * 2, 1);
        ctx.fill();
      }

      // Time widget
      ctx.fillStyle = `rgba(248, 250, 252, ${contentOpacity})`;
      ctx.font = "bold 52px system-ui";
      ctx.textAlign = "center";
      ctx.fillText("9:41", 180, 190);
      ctx.font = "16px system-ui";
      ctx.fillStyle = `rgba(203, 213, 225, ${contentOpacity})`;
      ctx.fillText("Saturday, March 15", 180, 218);
      ctx.textAlign = "start";

      // App icons grid — 4 columns × 4 rows
      const iconColors = ["#2563EB", "#22C55E", "#EF4444", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4", "#F97316",
                          "#10B981", "#6366F1", "#E11D48", "#FBBF24", "#14B8A6", "#A855F7", "#FB923C", "#3B82F6"];
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          const ix = 52 + col * 68;
          const iy = 270 + row * 80;
          ctx.beginPath();
          ctx.roundRect(ix, iy, 52, 52, 12);
          ctx.fillStyle = `rgba(${hexToRgb(iconColors[row * 4 + col])}, ${contentOpacity * 0.9})`;
          ctx.fill();
        }
      }

      // Dock at bottom
      ctx.beginPath();
      ctx.roundRect(50, 600, 260, 50, 20);
      ctx.fillStyle = `rgba(255, 255, 255, ${contentOpacity * 0.1})`;
      ctx.fill();
      const dockColors = ["#22C55E", "#2563EB", "#EF4444", "#F59E0B"];
      for (let d = 0; d < 4; d++) {
        ctx.beginPath();
        ctx.roundRect(68 + d * 62, 608, 36, 36, 10);
        ctx.fillStyle = `rgba(${hexToRgb(dockColors[d])}, ${contentOpacity * 0.9})`;
        ctx.fill();
      }
    }

    // Notch/Dynamic Island
    ctx.beginPath();
    ctx.roundRect(140, 25, 80, 28, 14);
    ctx.fillStyle = "#000";
    ctx.fill();

    // Home indicator
    ctx.beginPath();
    ctx.roundRect(140, 680, 80, 5, 3);
    ctx.fillStyle = progress > 0.9 ? "#F8FAFC" : "#333";
    ctx.fill();

    frames.push(canvas);
  }

  return frames;
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const [repairComplete, setRepairComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);

    if (mobile) return; // Use static image on mobile

    const frameCount = 36;
    framesRef.current = generateSpriteFrames(frameCount);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    canvas.width = 360;
    canvas.height = 720;

    // Draw first frame
    ctx.drawImage(framesRef.current[0], 0, 0);

    // ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        pin: false,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(self.progress * frameCount)
          );
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(framesRef.current[frameIndex], 0, 0);

          if (self.progress > 0.9 && !repairComplete) {
            setRepairComplete(true);
          }
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[130vh] bg-[#0F172A]"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden hero-bg-pulse">
        {/* Ambient gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#3B82F6]/8 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Text content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-full text-[#3B82F6] text-sm font-medium mb-6">
                  #1 Phone Repair Shop in Downtown Toronto
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[0.95] mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                We Fix Phones.
                <br />
                <span className="text-[#2563EB]">Same Day.</span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-[#94A3B8] max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Cracked screen? Dead battery? Walk in and walk out with a like-new device.
                100% original parts. Lifetime warranty. No appointment needed.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#2563EB] hover:bg-[#3B82F6] text-white text-base font-bold rounded-full transition-all duration-200 glow-shadow hover:scale-[1.04]"
                >
                  Get Instant Quote
                </Link>
                <a
                  href="tel:+14169798848"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-base font-semibold rounded-full transition-all duration-200"
                >
                  Call (416) 979-8848
                </a>
              </motion.div>
            </div>

            {/* Right: Phone animation */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                {/* Glow behind phone */}
                <div className="absolute inset-0 bg-[#2563EB]/20 blur-[80px] rounded-full scale-75" />

                {isMobile ? (
                  /* Static phone illustration for mobile */
                  <div className="relative w-[240px] h-[480px] sm:w-[280px] sm:h-[560px]">
                    <div className="absolute inset-0 rounded-[2rem] bg-[#1a1a2e] border-2 border-[#2563EB]/30 shadow-2xl shadow-blue-500/20 overflow-hidden">
                      {/* Notch */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full" />
                      {/* Screen glow */}
                      <div className="absolute inset-3 top-10 rounded-2xl bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-[#22C55E]/20 flex items-center justify-center">
                              <svg className="w-8 h-8 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="text-[#F8FAFC] font-bold text-sm">Repaired</p>
                            <p className="text-[#94A3B8] text-xs">Same Day</p>
                          </div>
                        </div>
                      </div>
                      {/* Home bar */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/50 rounded-full" />
                    </div>
                  </div>
                ) : (
                  /* Canvas sprite animation for desktop */
                  <canvas
                    ref={canvasRef}
                    className="relative w-[280px] h-[560px] lg:w-[320px] lg:h-[640px] sprite-canvas"
                    style={{ imageRendering: "auto" }}
                  />
                )}

                {/* CTA overlay on repair complete */}
                {repairComplete && (
                  <motion.div
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-max"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Link
                      href="/quote"
                      className="flex items-center gap-2 px-6 py-3 bg-[#22C55E] text-white font-bold rounded-full shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 transition-all text-sm"
                    >
                      Fixed. Same day. Book now.
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex flex-col items-center gap-2 text-[#94A3B8]">
            <span className="text-xs font-medium tracking-wider uppercase">Scroll to repair</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 border-2 border-[#94A3B8]/30 rounded-full flex justify-center pt-1"
            >
              <div className="w-1 h-2 bg-[#94A3B8] rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

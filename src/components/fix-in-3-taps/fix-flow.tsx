"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEVICE_OPTIONS, DAMAGE_ZONES, BUSINESS } from "@/lib/constants";
import { Smartphone, Laptop, Tablet, HelpCircle, ChevronLeft, Phone, MessageCircle, Calendar, X } from "lucide-react";
import Link from "next/link";

type Step = 1 | 2 | 3;

interface FixFlowProps {
  isModal?: boolean;
  onClose?: () => void;
}

const deviceIcons: Record<string, React.ReactNode> = {
  smartphone: <Smartphone className="w-8 h-8" />,
  laptop: <Laptop className="w-8 h-8" />,
  tablet: <Tablet className="w-8 h-8" />,
  "help-circle": <HelpCircle className="w-8 h-8" />,
};

export function FixFlow({ isModal = false, onClose }: FixFlowProps) {
  const [step, setStep] = useState<Step>(1);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [selectedDamages, setSelectedDamages] = useState<string[]>([]);

  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setStep(2);
  };

  const toggleDamage = (damageId: string) => {
    setSelectedDamages((prev) =>
      prev.includes(damageId)
        ? prev.filter((d) => d !== damageId)
        : [...prev, damageId]
    );
  };

  const handleNext = () => {
    if (step === 2 && selectedDamages.length > 0) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedDevice(null);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const reset = () => {
    setStep(1);
    setSelectedDevice(null);
    setSelectedDamages([]);
  };

  const selectedDamageDetails = DAMAGE_ZONES.filter((d) =>
    selectedDamages.includes(d.id)
  );

  const totalMinPrice = selectedDamageDetails.reduce((sum, d) => sum + d.price.min, 0);
  const totalMaxPrice = selectedDamageDetails.reduce((sum, d) => sum + d.price.max, 0);

  const containerClass = isModal
    ? "bg-[#1E293B] rounded-2xl overflow-hidden"
    : "bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden";

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h3 className="text-lg font-bold">Fix in 3 Taps</h3>
            <p className="text-xs text-[#94A3B8]">Step {step} of 3</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Progress dots */}
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-all ${
                s === step
                  ? "bg-[#0891B2] w-6"
                  : s < step
                  ? "bg-[#22C55E]"
                  : "bg-white/20"
              }`}
            />
          ))}
          {isModal && onClose && (
            <button onClick={onClose} className="ml-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content - Desktop: side by side, Mobile: single step */}
      <div className="lg:hidden">
        {/* Mobile: full screen steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="p-6"
            >
              <h4 className="text-base font-semibold mb-1">What device?</h4>
              <p className="text-sm text-[#94A3B8] mb-6">Select your device type</p>
              <div className="grid grid-cols-2 gap-3">
                {DEVICE_OPTIONS.map((device) => (
                  <button
                    key={device.id}
                    onClick={() => handleDeviceSelect(device.id)}
                    className={`flex flex-col items-center gap-3 p-5 rounded-xl border transition-all active:scale-95 ${
                      selectedDevice === device.id
                        ? "bg-[#0891B2]/10 border-[#0891B2] text-[#06B6D4]"
                        : "bg-white/5 border-white/10 hover:border-white/20 text-[#94A3B8]"
                    }`}
                  >
                    {deviceIcons[device.icon]}
                    <span className="text-sm font-medium">{device.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="p-6"
            >
              <h4 className="text-base font-semibold mb-1">What&apos;s broken?</h4>
              <p className="text-sm text-[#94A3B8] mb-6">Tap all that apply</p>

              <div className="flex gap-6">
                {/* Phone silhouette */}
                <div className="relative w-32 flex-shrink-0">
                  <PhoneSilhouette selectedZones={selectedDamages} onToggle={toggleDamage} />
                </div>

                {/* Zone list */}
                <div className="flex-1 space-y-2">
                  {DAMAGE_ZONES.map((zone) => (
                    <button
                      key={zone.id}
                      onClick={() => toggleDamage(zone.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm transition-all ${
                        selectedDamages.includes(zone.id)
                          ? "bg-[#EF4444]/10 border border-[#EF4444]/30 text-white"
                          : "bg-white/5 border border-white/10 text-[#94A3B8] hover:border-white/20"
                      }`}
                    >
                      <span className="font-medium">{zone.label}</span>
                      <span className="text-xs">from ${zone.price.min}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={selectedDamages.length === 0}
                className="w-full mt-6 py-3.5 bg-[#0891B2] hover:bg-[#06B6D4] disabled:bg-white/10 disabled:text-[#94A3B8] text-white font-semibold rounded-full transition-all disabled:cursor-not-allowed"
              >
                {selectedDamages.length > 0
                  ? `See Price (${selectedDamages.length} issue${selectedDamages.length > 1 ? "s" : ""})`
                  : "Select at least one issue"}
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="p-6"
            >
              <ResultCard
                device={selectedDevice}
                damages={selectedDamageDetails}
                totalMin={totalMinPrice}
                totalMax={totalMaxPrice}
                onReset={reset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: 3 columns */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:divide-x lg:divide-white/5">
        {/* Step 1 */}
        <div className="p-6">
          <h4 className="text-base font-semibold mb-1">1. Device</h4>
          <p className="text-sm text-[#94A3B8] mb-4">Select your device</p>
          <div className="grid grid-cols-2 gap-2">
            {DEVICE_OPTIONS.map((device) => (
              <button
                key={device.id}
                onClick={() => {
                  setSelectedDevice(device.id);
                  if (step === 1) setStep(2);
                }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                  selectedDevice === device.id
                    ? "bg-[#0891B2]/10 border-[#0891B2] text-[#06B6D4]"
                    : "bg-white/5 border-white/10 hover:border-white/20 text-[#94A3B8]"
                }`}
              >
                {deviceIcons[device.icon]}
                <span className="text-xs font-medium">{device.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 */}
        <div className={`p-6 transition-opacity ${step >= 2 ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
          <h4 className="text-base font-semibold mb-1">2. Damage</h4>
          <p className="text-sm text-[#94A3B8] mb-4">Tap broken areas</p>
          <div className="space-y-2">
            {DAMAGE_ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => toggleDamage(zone.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition-all ${
                  selectedDamages.includes(zone.id)
                    ? "bg-[#EF4444]/10 border border-[#EF4444]/30 text-white"
                    : "bg-white/5 border border-white/10 text-[#94A3B8] hover:border-white/20"
                }`}
              >
                <span className="font-medium">{zone.label}</span>
                <span className="text-xs">from ${zone.price.min}</span>
              </button>
            ))}
          </div>
          {step === 2 && selectedDamages.length > 0 && (
            <button
              onClick={handleNext}
              className="w-full mt-4 py-2.5 bg-[#0891B2] hover:bg-[#06B6D4] text-white text-sm font-semibold rounded-full transition-all"
            >
              See Price →
            </button>
          )}
        </div>

        {/* Step 3 */}
        <div className={`p-6 transition-opacity ${step === 3 ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
          <h4 className="text-base font-semibold mb-1">3. Your Quote</h4>
          <p className="text-sm text-[#94A3B8] mb-4">Estimated pricing</p>
          {step === 3 ? (
            <ResultCard
              device={selectedDevice}
              damages={selectedDamageDetails}
              totalMin={totalMinPrice}
              totalMax={totalMaxPrice}
              onReset={reset}
              compact
            />
          ) : (
            <div className="flex items-center justify-center h-48 text-[#94A3B8] text-sm">
              Complete steps 1 & 2
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Phone silhouette SVG with tappable damage zones
function PhoneSilhouette({
  selectedZones,
  onToggle,
}: {
  selectedZones: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <svg viewBox="0 0 100 260" className="w-full">
      {/* Phone outline */}
      <rect
        x="10"
        y="10"
        width="80"
        height="240"
        rx="16"
        ry="16"
        fill="#1a1a2e"
        stroke="#333"
        strokeWidth="2"
      />
      {/* Notch */}
      <rect x="30" y="14" width="40" height="10" rx="5" fill="#000" />
      {/* Home bar */}
      <rect x="30" y="238" width="40" height="4" rx="2" fill="#333" />

      {/* Tappable zones - just showing screen, charging, speaker as primary tap targets */}
      {/* Screen zone */}
      <rect
        x="15"
        y="30"
        width="70"
        height="180"
        rx="4"
        fill={selectedZones.includes("screen") ? "rgba(239,68,68,0.2)" : "transparent"}
        stroke={selectedZones.includes("screen") ? "#EF4444" : "transparent"}
        strokeWidth="1.5"
        onClick={() => onToggle("screen")}
        className="cursor-pointer"
      />
      {selectedZones.includes("screen") && (
        <circle cx="50" cy="120" r="12" fill="rgba(239,68,68,0.3)" className="damage-pulse" />
      )}

      {/* Charging port zone */}
      <rect
        x="35"
        y="215"
        width="30"
        height="20"
        rx="4"
        fill={selectedZones.includes("charging") ? "rgba(239,68,68,0.2)" : "transparent"}
        stroke={selectedZones.includes("charging") ? "#EF4444" : "transparent"}
        strokeWidth="1.5"
        onClick={() => onToggle("charging")}
        className="cursor-pointer"
      />

      {/* Speaker zone */}
      <rect
        x="30"
        y="28"
        width="40"
        height="15"
        rx="4"
        fill={selectedZones.includes("speaker") ? "rgba(239,68,68,0.2)" : "transparent"}
        stroke={selectedZones.includes("speaker") ? "#EF4444" : "transparent"}
        strokeWidth="1.5"
        onClick={() => onToggle("speaker")}
        className="cursor-pointer"
      />
    </svg>
  );
}

// Result card showing price estimate
function ResultCard({
  device,
  damages,
  totalMin,
  totalMax,
  onReset,
  compact = false,
}: {
  device: string | null;
  damages: typeof DAMAGE_ZONES extends readonly (infer T)[] ? T[] : never;
  totalMin: number;
  totalMax: number;
  onReset: () => void;
  compact?: boolean;
}) {
  const deviceLabel = DEVICE_OPTIONS.find((d) => d.id === device)?.label || "Device";

  return (
    <div className="space-y-4">
      {/* Price display */}
      <div className="text-center p-4 rounded-xl bg-gradient-to-b from-[#0891B2]/10 to-transparent border border-[#0891B2]/20">
        <p className="text-xs text-[#94A3B8] mb-1">{deviceLabel} Repair Estimate</p>
        <p className="text-3xl font-black text-white">
          ${totalMin}
          <span className="text-lg font-normal text-[#94A3B8]"> – ${totalMax}</span>
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
          <span className="text-xs text-[#22C55E] font-medium">Ready same day</span>
        </div>
      </div>

      {/* Selected issues */}
      <div className="space-y-1.5">
        {damages.map((d) => (
          <div key={d.id} className="flex justify-between text-sm px-2">
            <span className="text-[#94A3B8]">{d.label}</span>
            <span className="text-white font-medium">from ${d.price.min}</span>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className={`space-y-2 ${compact ? "" : "pt-2"}`}>
        <Link
          href="/book"
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold rounded-full transition-all glow-shadow"
        >
          <Calendar className="w-4 h-4" />
          Book Now
        </Link>
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium rounded-full transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            Call
          </a>
          <a
            href={BUSINESS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 bg-[#22C55E]/10 hover:bg-[#22C55E]/20 border border-[#22C55E]/30 text-[#22C55E] text-sm font-medium rounded-full transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full text-center text-xs text-[#94A3B8] hover:text-white py-2 transition-colors"
      >
        Start over
      </button>
    </div>
  );
}

// Modal wrapper for desktop
export function FixFlowModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl mx-4"
          >
            <FixFlow isModal onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

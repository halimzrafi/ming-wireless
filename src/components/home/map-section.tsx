"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export function MapSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#3B82F6] text-sm font-semibold tracking-wider uppercase">Visit Us</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 tracking-tight">
            Downtown Toronto&apos;s Go-To
            <br />
            <span className="text-[#2563EB]">Repair Shop</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Map */}
          <motion.div
            className="lg:col-span-3 rounded-2xl overflow-hidden border border-white/5 h-[350px] lg:h-[400px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <iframe
              src={BUSINESS.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ming Wireless Location"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#3B82F6] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{BUSINESS.address}</p>
                  <p className="text-sm text-[#94A3B8]">{BUSINESS.city}, {BUSINESS.province} {BUSINESS.postalCode}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#3B82F6] mt-0.5 flex-shrink-0" />
                <a href={`tel:${BUSINESS.phoneRaw}`} className="font-semibold text-sm hover:text-[#3B82F6] transition-colors">
                  {BUSINESS.phone}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#3B82F6] mt-0.5 flex-shrink-0" />
                <div className="text-sm space-y-1">
                  {Object.entries(BUSINESS.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between gap-6">
                      <span className="text-[#94A3B8]">{day}</span>
                      <span className={`font-medium ${hours === "Closed" ? "text-[#EF4444]" : ""}`}>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=250+Dundas+St+W+Toronto`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#2563EB] hover:bg-[#3B82F6] text-white font-semibold rounded-full transition-all glow-shadow"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

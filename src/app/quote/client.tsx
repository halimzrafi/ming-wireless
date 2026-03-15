"use client";

import { useState } from "react";
import { FixFlow } from "@/components/fix-in-3-taps/fix-flow";
import { QuoteForm } from "@/components/forms/quote-form";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";

export function QuotePageClient() {
  const [showFullForm, setShowFullForm] = useState(false);

  return (
    <>
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
              Get Your <span className="text-[#2563EB]">Instant Quote</span>
            </h1>
            <p className="text-[#94A3B8] mt-3 max-w-lg mx-auto">
              Select your device and issue for instant pricing. Or fill out the detailed form below for a custom quote.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <FixFlow />
          </motion.div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setShowFullForm(!showFullForm)}
              className="text-[#3B82F6] hover:text-white text-sm font-medium transition-colors"
            >
              {showFullForm ? "Hide detailed form" : "Need a custom quote? Fill out the detailed form"}
            </button>
          </div>

          {showFullForm && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <QuoteForm />
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
      <div className="h-20 lg:hidden" />
    </>
  );
}

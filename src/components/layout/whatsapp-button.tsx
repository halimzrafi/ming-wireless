"use client";

import { MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { motion } from "framer-motion";

export function WhatsAppButton() {
  return (
    <motion.a
      href={BUSINESS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden lg:flex fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#22C55E] rounded-full items-center justify-center shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-110 transition-all"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </motion.a>
  );
}

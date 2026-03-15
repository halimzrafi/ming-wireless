"use client";

import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/constants";
import { motion } from "framer-motion";

function ReviewCard({ review }: { review: typeof REVIEWS[number] }) {
  return (
    <div className="flex-shrink-0 w-[340px] bg-[#1E293B] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-white/20"
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#2563EB]/20 flex items-center justify-center text-xs font-bold text-[#3B82F6]">
            {review.name.charAt(0)}
          </div>
          <span className="text-sm font-medium">{review.name}</span>
        </div>
        <span className="text-xs text-[#94A3B8]">{review.date}</span>
      </div>
    </div>
  );
}

export function Reviews() {
  const doubledReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section className="py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <span className="text-[#3B82F6] text-sm font-semibold tracking-wider uppercase">Reviews</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 tracking-tight">
            What Our Customers
            <br />
            <span className="text-[#2563EB]">Say About Us</span>
          </h2>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-[#94A3B8]">4.8 average from 247+ reviews on Google</span>
          </div>
        </motion.div>
      </div>

      {/* Auto-scrolling carousel */}
      <div className="relative">
        <div className="review-scroll flex gap-6 px-4">
          {doubledReviews.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0F172A] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0F172A] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

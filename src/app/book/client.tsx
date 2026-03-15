"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Calendar, Clock, CheckCircle2, Loader2, Send } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { BUSINESS } from "@/lib/constants";
import { motion } from "framer-motion";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  device: z.string().min(1, "Select a device"),
  issue: z.string().min(1, "Describe the issue"),
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM",
];

export function BookingPageClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const selectedDate = watch("date");

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Failed to submit booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate next 14 days (excluding Sundays)
  const availableDates: { value: string; label: string; day: string }[] = [];
  const today = new Date();
  for (let i = 0; i < 21 && availableDates.length < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (date.getDay() !== 0) { // Skip Sundays
      availableDates.push({
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-CA", { month: "short", day: "numeric" }),
        day: date.toLocaleDateString("en-CA", { weekday: "short" }),
      });
    }
  }

  return (
    <>
      <div className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
              Book Your <span className="text-[#0891B2]">Repair</span>
            </h1>
            <p className="text-[#94A3B8] mt-3 max-w-lg mx-auto">
              Reserve your spot and skip the wait. Walk-ins are always welcome too!
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div
              className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-8 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle2 className="w-16 h-16 text-[#22C55E] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
              <p className="text-[#94A3B8]">
                Check your email for confirmation details. See you soon at {BUSINESS.address}!
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-6 lg:p-8 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Date picker */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-[#06B6D4]" />
                  <p className="text-sm font-semibold">Select Date</p>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {availableDates.slice(0, 14).map((d) => (
                    <label
                      key={d.value}
                      className={`flex flex-col items-center py-3 px-2 rounded-xl border cursor-pointer transition-all text-center ${
                        selectedDate === d.value
                          ? "bg-[#0891B2]/10 border-[#0891B2] text-white"
                          : "bg-white/5 border-white/10 text-[#94A3B8] hover:border-white/20"
                      }`}
                    >
                      <input type="radio" value={d.value} {...register("date")} className="sr-only" />
                      <span className="text-xs">{d.day}</span>
                      <span className="text-sm font-bold mt-0.5">{d.label}</span>
                    </label>
                  ))}
                </div>
                {errors.date && <p className="text-[#EF4444] text-xs mt-1">{errors.date.message}</p>}
              </div>

              {/* Time slots */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-[#06B6D4]" />
                  <p className="text-sm font-semibold">Select Time</p>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {timeSlots.map((time) => (
                    <label
                      key={time}
                      className="flex items-center justify-center py-2.5 px-2 rounded-xl border cursor-pointer transition-all text-xs font-medium bg-white/5 border-white/10 text-[#94A3B8] hover:border-white/20 has-[:checked]:bg-[#0891B2]/10 has-[:checked]:border-[#0891B2] has-[:checked]:text-white"
                    >
                      <input type="radio" value={time} {...register("time")} className="sr-only" />
                      {time}
                    </label>
                  ))}
                </div>
                {errors.time && <p className="text-[#EF4444] text-xs mt-1">{errors.time.message}</p>}
              </div>

              {/* Device + issue */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <select
                    {...register("device")}
                    className="w-full px-3 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-[#0891B2] focus:outline-none transition-colors text-[#94A3B8]"
                  >
                    <option value="">Select Device</option>
                    <option value="iphone">iPhone</option>
                    <option value="samsung">Samsung</option>
                    <option value="pixel">Google Pixel</option>
                    <option value="macbook">MacBook</option>
                    <option value="tablet">Tablet</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.device && <p className="text-[#EF4444] text-xs mt-1">{errors.device.message}</p>}
                </div>
                <div>
                  <div className="float-label-group">
                    <input
                      {...register("issue")}
                      placeholder=" "
                      className="w-full px-3 pb-2 pt-5 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-[#0891B2] focus:outline-none transition-colors"
                    />
                    <label>Issue (e.g., cracked screen)</label>
                  </div>
                  {errors.issue && <p className="text-[#EF4444] text-xs mt-1">{errors.issue.message}</p>}
                </div>
              </div>

              {/* Contact info */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="float-label-group">
                  <input
                    {...register("name")}
                    placeholder=" "
                    className="w-full px-3 pb-2 pt-5 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-[#0891B2] focus:outline-none transition-colors"
                  />
                  <label>Full Name</label>
                </div>
                <div className="float-label-group">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder=" "
                    className="w-full px-3 pb-2 pt-5 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-[#0891B2] focus:outline-none transition-colors"
                  />
                  <label>Email</label>
                </div>
                <div className="float-label-group">
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder=" "
                    className="w-full px-3 pb-2 pt-5 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-[#0891B2] focus:outline-none transition-colors"
                  />
                  <label>Phone</label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#0891B2] hover:bg-[#06B6D4] disabled:opacity-50 text-white font-bold rounded-full transition-all glow-shadow"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Confirm Booking
                  </>
                )}
              </button>
            </motion.form>
          )}
        </div>
      </div>
      <Footer />
      <div className="h-20 lg:hidden" />
    </>
  );
}

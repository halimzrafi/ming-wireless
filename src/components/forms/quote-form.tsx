"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  device: z.string().min(1, "Select a device"),
  issue: z.string().min(1, "Describe the issue"),
  preferredContact: z.enum(["email", "phone", "whatsapp"]),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export function QuoteForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      preferredContact: "email",
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Failed to submit quote:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-16 h-16 text-[#22C55E] mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Quote Request Sent!</h3>
        <p className="text-[#94A3B8]">
          We&apos;ll get back to you within 30 minutes during business hours with your personalized quote.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-6 lg:p-8 space-y-5"
    >
      <h3 className="text-xl font-bold mb-2">Detailed Quote Request</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className="float-label-group">
            <input
              {...register("name")}
              placeholder=" "
              className="w-full px-3 pb-2 pt-5 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-[#0891B2] focus:outline-none transition-colors"
            />
            <label>Full Name</label>
          </div>
          {errors.name && <p className="text-[#EF4444] text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <div className="float-label-group">
            <input
              {...register("email")}
              type="email"
              placeholder=" "
              className="w-full px-3 pb-2 pt-5 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-[#0891B2] focus:outline-none transition-colors"
            />
            <label>Email</label>
          </div>
          {errors.email && <p className="text-[#EF4444] text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className="float-label-group">
            <input
              {...register("phone")}
              type="tel"
              placeholder=" "
              className="w-full px-3 pb-2 pt-5 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-[#0891B2] focus:outline-none transition-colors"
            />
            <label>Phone Number</label>
          </div>
          {errors.phone && <p className="text-[#EF4444] text-xs mt-1">{errors.phone.message}</p>}
        </div>

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
      </div>

      <div>
        <div className="float-label-group">
          <textarea
            {...register("issue")}
            placeholder=" "
            rows={3}
            className="w-full px-3 pb-2 pt-5 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-[#0891B2] focus:outline-none transition-colors resize-none"
          />
          <label>Describe the Issue</label>
        </div>
        {errors.issue && <p className="text-[#EF4444] text-xs mt-1">{errors.issue.message}</p>}
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Preferred Contact Method</p>
        <div className="flex gap-3">
          {(["email", "phone", "whatsapp"] as const).map((method) => (
            <label
              key={method}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:border-white/20 transition-colors text-sm has-[:checked]:border-[#0891B2] has-[:checked]:bg-[#0891B2]/10"
            >
              <input
                type="radio"
                value={method}
                {...register("preferredContact")}
                className="sr-only"
              />
              <span className="capitalize">{method}</span>
            </label>
          ))}
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
            Submit Quote Request
          </>
        )}
      </button>
    </form>
  );
}

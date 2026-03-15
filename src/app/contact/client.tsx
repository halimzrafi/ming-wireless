"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, CheckCircle2, Loader2, MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { BUSINESS } from "@/lib/constants";
import { motion } from "framer-motion";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  message: z.string().min(10, "Please provide more details"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactPageClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
              Get In <span className="text-[#2563EB]">Touch</span>
            </h1>
            <p className="text-[#94A3B8] mt-3 max-w-lg mx-auto">
              Have a question? Need a quote? We&apos;re here to help.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-sm text-[#94A3B8]">{BUSINESS.address}</p>
                    <p className="text-sm text-[#94A3B8]">{BUSINESS.city}, {BUSINESS.province} {BUSINESS.postalCode}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a href={`tel:${BUSINESS.phoneRaw}`} className="text-sm text-[#3B82F6] hover:text-white transition-colors">
                      {BUSINESS.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href={`mailto:${BUSINESS.email}`} className="text-sm text-[#3B82F6] hover:text-white transition-colors">
                      {BUSINESS.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#22C55E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                    <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm text-[#22C55E] hover:text-white transition-colors">
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Hours</h3>
                    <div className="text-sm space-y-1">
                      {Object.entries(BUSINESS.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between gap-8">
                          <span className="text-[#94A3B8]">{day}</span>
                          <span className={hours === "Closed" ? "text-[#EF4444]" : ""}>{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-white/5 h-[250px]">
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
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {isSubmitted ? (
                <div className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center">
                  <CheckCircle2 className="w-16 h-16 text-[#22C55E] mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-[#94A3B8]">We&apos;ll get back to you within a few hours during business hours.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-6 lg:p-8 space-y-5"
                >
                  <h3 className="text-xl font-bold">Send Us a Message</h3>

                  <div className="float-label-group">
                    <input
                      {...register("name")}
                      placeholder=" "
                      className="w-full px-3 pb-2 pt-5 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-[#2563EB] focus:outline-none transition-colors"
                    />
                    <label>Full Name</label>
                  </div>
                  {errors.name && <p className="text-[#EF4444] text-xs mt-1">{errors.name.message}</p>}

                  <div className="float-label-group">
                    <input
                      {...register("email")}
                      type="email"
                      placeholder=" "
                      className="w-full px-3 pb-2 pt-5 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-[#2563EB] focus:outline-none transition-colors"
                    />
                    <label>Email</label>
                  </div>
                  {errors.email && <p className="text-[#EF4444] text-xs mt-1">{errors.email.message}</p>}

                  <div className="float-label-group">
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder=" "
                      className="w-full px-3 pb-2 pt-5 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-[#2563EB] focus:outline-none transition-colors"
                    />
                    <label>Phone (optional)</label>
                  </div>

                  <div className="float-label-group">
                    <textarea
                      {...register("message")}
                      placeholder=" "
                      rows={5}
                      className="w-full px-3 pb-2 pt-5 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-[#2563EB] focus:outline-none transition-colors resize-none"
                    />
                    <label>Message</label>
                  </div>
                  {errors.message && <p className="text-[#EF4444] text-xs mt-1">{errors.message.message}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#2563EB] hover:bg-[#3B82F6] disabled:opacity-50 text-white font-bold rounded-full transition-all glow-shadow"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
      <div className="h-20 lg:hidden" />
    </>
  );
}

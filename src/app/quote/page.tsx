import { Metadata } from "next";
import { QuotePageClient } from "./client";

export const metadata: Metadata = {
  title: "Get Instant Quote",
  description: "Get an instant repair quote for your iPhone, Samsung, Google Pixel, MacBook, or tablet. Same-day service in downtown Toronto.",
};

export default function QuotePage() {
  return <QuotePageClient />;
}

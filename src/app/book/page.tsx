import { Metadata } from "next";
import { BookingPageClient } from "./client";

export const metadata: Metadata = {
  title: "Book a Repair",
  description: "Book your phone or laptop repair appointment at Ming Wireless. Same-day service available in downtown Toronto.",
};

export default function BookPage() {
  return <BookingPageClient />;
}

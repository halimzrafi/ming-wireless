import { Metadata } from "next";
import { ContactPageClient } from "./client";

export const metadata: Metadata = {
  title: "Contact Ming Wireless",
  description: "Contact Ming Wireless for phone and laptop repair in downtown Toronto. Call (416) 979-8848 or visit 250 Dundas St W. Same-day service available.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}

import { Metadata } from "next";
import { ServicesPageClient } from "./client";

export const metadata: Metadata = {
  title: "Phone & Laptop Repair Services",
  description: "iPhone, Samsung, Google Pixel, MacBook and laptop repair services in Toronto. Screen repair, battery replacement, water damage recovery. Same-day service.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}

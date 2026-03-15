import { Metadata } from "next";
import { SEOLandingPage } from "@/components/seo/seo-landing-page";

export const metadata: Metadata = {
  title: "Phone Repair Downtown Toronto | Walk-In Same Day | Ming Wireless",
  description: "Walk-in phone repair in downtown Toronto. iPhone, Samsung, Google Pixel repairs with original parts. 250 Dundas St W. Same-day service, lifetime warranty.",
};

export default function PhoneRepairDowntownToronto() {
  return (
    <SEOLandingPage
      h1="Phone Repair Downtown Toronto"
      subtitle="Walk-In Same-Day Service at 250 Dundas St W"
      intro="Looking for a reliable phone repair shop in downtown Toronto? Ming Wireless at 250 Dundas St W (near Yonge-Dundas Square) offers walk-in, same-day repairs for all major phone brands. Original parts, transparent pricing, and a lifetime warranty on every repair."
      services={[
        { name: "Screen Repair (All Brands)", price: "From $89", time: "30–60 min" },
        { name: "Battery Replacement", price: "From $59", time: "20–40 min" },
        { name: "Water Damage Recovery", price: "From $79", time: "1–3 hours" },
        { name: "Charging Port Repair", price: "From $69", time: "30–60 min" },
        { name: "Back Glass Replacement", price: "From $69", time: "45–90 min" },
      ]}
      models={["iPhone (All Models)", "Samsung Galaxy", "Google Pixel", "Motorola", "OnePlus", "LG"]}
    />
  );
}

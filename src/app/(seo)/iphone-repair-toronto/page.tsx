import { Metadata } from "next";
import { SEOLandingPage } from "@/components/seo/seo-landing-page";

export const metadata: Metadata = {
  title: "iPhone Screen Repair Toronto | Same-Day | Ming Wireless",
  description: "Cracked iPhone screen? Ming Wireless offers same-day iPhone repair in downtown Toronto. Original Apple parts, lifetime warranty. Walk in or book online.",
};

export default function IPhoneRepairToronto() {
  return (
    <SEOLandingPage
      h1="iPhone Repair Toronto"
      subtitle="Same-Day Service with Original Parts"
      intro="Cracked your iPhone screen? Battery draining too fast? Whether you have an iPhone 15 Pro Max or an older model, Ming Wireless provides expert same-day iPhone repairs in the heart of downtown Toronto. We use only 100% original Apple parts and back every repair with our lifetime warranty."
      services={[
        { name: "iPhone Screen Repair", price: "From $89", time: "30–60 min" },
        { name: "iPhone Battery Replacement", price: "From $59", time: "20–40 min" },
        { name: "iPhone Charging Port Repair", price: "From $69", time: "30–60 min" },
        { name: "iPhone Water Damage Repair", price: "From $79", time: "1–3 hours" },
        { name: "iPhone Back Glass Replacement", price: "From $79", time: "45–90 min" },
      ]}
      models={["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone 11", "iPhone SE"]}
    />
  );
}

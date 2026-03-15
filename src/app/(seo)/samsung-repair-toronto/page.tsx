import { Metadata } from "next";
import { SEOLandingPage } from "@/components/seo/seo-landing-page";

export const metadata: Metadata = {
  title: "Samsung Phone Repair Toronto | Same-Day | Ming Wireless",
  description: "Samsung Galaxy screen repair in downtown Toronto. Same-day service, original Samsung parts, lifetime warranty. S24, S23, Z Fold, Z Flip repairs.",
};

export default function SamsungRepairToronto() {
  return (
    <SEOLandingPage
      h1="Samsung Repair Toronto"
      subtitle="Galaxy Screen & Battery Experts"
      intro="From the latest Galaxy S24 Ultra to the Z Fold and Z Flip series, Ming Wireless is downtown Toronto's trusted Samsung repair centre. We stock original Samsung displays and batteries for same-day turnaround on most repairs."
      services={[
        { name: "Samsung Screen Repair", price: "From $99", time: "30–60 min" },
        { name: "Samsung Battery Replacement", price: "From $69", time: "20–40 min" },
        { name: "Samsung Charging Port", price: "From $69", time: "30–60 min" },
        { name: "Samsung Water Damage", price: "From $79", time: "1–3 hours" },
      ]}
      models={["Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24", "Galaxy S23", "Galaxy Z Fold 5", "Galaxy Z Flip 5", "Galaxy A54", "Galaxy A34"]}
    />
  );
}

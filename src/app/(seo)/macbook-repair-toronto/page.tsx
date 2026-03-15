import { Metadata } from "next";
import { SEOLandingPage } from "@/components/seo/seo-landing-page";

export const metadata: Metadata = {
  title: "MacBook Repair Toronto | Screen, Battery, Logic Board | Ming Wireless",
  description: "MacBook Pro and MacBook Air repair in downtown Toronto. Screen replacement, battery, keyboard, logic board repairs. Fast turnaround, original parts.",
};

export default function MacBookRepairToronto() {
  return (
    <SEOLandingPage
      h1="MacBook Repair Toronto"
      subtitle="Screen, Battery & Logic Board Experts"
      intro="MacBook not performing? Ming Wireless provides expert MacBook Pro and MacBook Air repairs in downtown Toronto. From screen replacements and battery swaps to complex logic board repairs and SSD upgrades — we handle it all with genuine parts."
      services={[
        { name: "MacBook Screen Replacement", price: "From $249", time: "1–2 days" },
        { name: "MacBook Battery Replacement", price: "From $149", time: "Same day" },
        { name: "MacBook Keyboard Repair", price: "From $179", time: "1–2 days" },
        { name: "MacBook Logic Board Repair", price: "From $299", time: "2–3 days" },
        { name: "MacBook SSD Upgrade", price: "From $129", time: "Same day" },
      ]}
      models={["MacBook Pro 16\"", "MacBook Pro 14\"", "MacBook Pro 13\"", "MacBook Air M2", "MacBook Air M1", "MacBook Air 13\""]}
    />
  );
}

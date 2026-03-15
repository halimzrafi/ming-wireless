import { Metadata } from "next";
import { AboutPageClient } from "./client";

export const metadata: Metadata = {
  title: "About Ming Wireless",
  description: "Learn about Ming Wireless — Toronto's trusted phone repair shop since 2019. Expert technicians, original parts, lifetime warranty, and corporate repair services.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}

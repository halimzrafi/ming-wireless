import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { MobileBar } from "@/components/layout/mobile-bar";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { LenisProvider } from "@/components/providers/lenis-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ming Wireless | Phone Repair Toronto | Same-Day Service",
    template: "%s | Ming Wireless Toronto",
  },
  description: "Toronto's trusted phone repair shop. Same-day iPhone, Samsung, Google Pixel & MacBook repairs with 100% original parts and lifetime warranty. 250 Dundas St W.",
  keywords: ["phone repair toronto", "iphone repair toronto", "samsung repair toronto", "screen repair downtown toronto", "macbook repair toronto", "same day phone repair"],
  openGraph: {
    title: "Ming Wireless | Phone Repair Toronto",
    description: "Same-day phone & laptop repair with original parts and lifetime warranty. Downtown Toronto.",
    url: "https://mingwireless.com",
    siteName: "Ming Wireless",
    locale: "en_CA",
    type: "website",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://mingwireless.com"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ming Wireless",
  image: "https://mingwireless.com/og-image.jpg",
  "@id": "https://mingwireless.com",
  url: "https://mingwireless.com",
  telephone: "+14169798848",
  address: {
    "@type": "PostalAddress",
    streetAddress: "250 Dundas St W, Unit 106",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M5T 2Z5",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.6533,
    longitude: -79.3900,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:30",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "247",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#0F172A] text-[#F8FAFC] font-sans overflow-x-hidden">
        <LenisProvider>
          <Header />
          <main>{children}</main>
          <MobileBar />
          <WhatsAppButton />
        </LenisProvider>
      </body>
    </html>
  );
}

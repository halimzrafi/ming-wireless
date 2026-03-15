export const BUSINESS = {
  name: "Ming Wireless",
  phone: "(416) 979-8848",
  phoneRaw: "+14169798848",
  whatsapp: "https://wa.me/14169798848",
  email: "info@mingwireless.com",
  address: "250 Dundas St W, Unit 106",
  city: "Toronto",
  province: "ON",
  postalCode: "M5T 2Z5",
  country: "CA",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.6!2d-79.39!3d43.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDM5JzEyLjAiTiA3OcKwMjMnMjQuMCJX!5e0!3m2!1sen!2sca!4v1",
  hours: {
    "Mon–Fri": "10:00 AM – 7:00 PM",
    Saturday: "10:30 AM – 6:00 PM",
    Sunday: "Closed",
  },
  founded: 2019,
  repairsCompleted: 12400,
} as const;

export const SERVICES = [
  {
    id: "screen",
    title: "Screen Repair",
    description: "Cracked, shattered, or unresponsive screens restored with 100% original parts. Same-day service for most devices.",
    icon: "screen",
    time: "30–60 min",
    fromPrice: 89,
    cta: "Fix My Screen",
  },
  {
    id: "battery",
    title: "Battery Replacement",
    description: "Dying fast? We replace your battery with a genuine OEM cell and restore all-day power.",
    icon: "battery",
    time: "20–40 min",
    fromPrice: 59,
    cta: "Replace Battery",
  },
  {
    id: "water",
    title: "Water Damage",
    description: "Dropped it in water? Our ultrasonic cleaning and board-level repair saves most water-damaged devices.",
    icon: "water",
    time: "1–3 hours",
    fromPrice: 79,
    cta: "Save My Phone",
  },
  {
    id: "macbook",
    title: "MacBook & Laptop",
    description: "Screen replacement, keyboard repair, logic board fixes, and SSD upgrades for all MacBook and laptop models.",
    icon: "laptop",
    time: "1–3 days",
    fromPrice: 149,
    cta: "Fix My Laptop",
  },
  {
    id: "charging",
    title: "Charging Port",
    description: "Won't charge? We repair or replace damaged charging ports so your device powers up reliably again.",
    icon: "charging",
    time: "30–60 min",
    fromPrice: 69,
    cta: "Fix Charging",
  },
  {
    id: "mailin",
    title: "Mail-In Repair",
    description: "Not in Toronto? Ship your device to us — we repair it and ship it back with free insured return shipping.",
    icon: "mail",
    time: "3–5 days",
    fromPrice: 89,
    cta: "Start Mail-In",
  },
] as const;

export const REVIEWS = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "Cracked my iPhone 15 Pro screen on Friday, walked in, and had it back in 45 minutes. Screen looks brand new. Lifetime warranty is amazing!",
    date: "2 weeks ago",
  },
  {
    name: "James L.",
    rating: 5,
    text: "Best repair shop in downtown Toronto. They replaced my Samsung S24 battery and it's like a new phone. Fair pricing and incredibly fast.",
    date: "1 month ago",
  },
  {
    name: "Priya K.",
    rating: 5,
    text: "Dropped my phone in water at a restaurant. Ming Wireless saved it completely — data and all. Can't recommend enough.",
    date: "3 weeks ago",
  },
  {
    name: "Michael T.",
    rating: 4,
    text: "Had my MacBook Pro screen replaced here. Great quality work, original parts, and done faster than the Apple Store quoted me. Will come back.",
    date: "1 month ago",
  },
  {
    name: "Diana R.",
    rating: 5,
    text: "Used their mail-in service from Ottawa. Phone came back perfectly repaired in 4 days. Communication was excellent throughout the process.",
    date: "2 months ago",
  },
] as const;

export const DEVICE_OPTIONS = [
  { id: "iphone", label: "iPhone", icon: "smartphone" },
  { id: "samsung", label: "Samsung", icon: "smartphone" },
  { id: "pixel", label: "Google Pixel", icon: "smartphone" },
  { id: "macbook", label: "MacBook", icon: "laptop" },
  { id: "tablet", label: "Tablet", icon: "tablet" },
  { id: "other", label: "Other", icon: "help-circle" },
] as const;

export const DAMAGE_ZONES = [
  { id: "screen", label: "Screen", price: { min: 89, max: 329 }, time: "30–60 min" },
  { id: "back-glass", label: "Back Glass", price: { min: 69, max: 199 }, time: "45–90 min" },
  { id: "battery", label: "Battery", price: { min: 59, max: 129 }, time: "20–40 min" },
  { id: "charging", label: "Charging Port", price: { min: 69, max: 149 }, time: "30–60 min" },
  { id: "speaker", label: "Speaker", price: { min: 59, max: 119 }, time: "30–45 min" },
  { id: "water", label: "Water Damage", price: { min: 79, max: 249 }, time: "1–3 hours" },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/book", label: "Book Repair" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

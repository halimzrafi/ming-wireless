import Link from "next/link";
import { BUSINESS, NAV_LINKS, SERVICES } from "@/lib/constants";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0a1120] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-xl font-black tracking-tight">
                Ming<span className="text-[#0891B2]">Wireless</span>
              </span>
            </Link>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
              Toronto&apos;s trusted destination for same-day phone, tablet, and laptop repairs. 100% original parts, lifetime warranty.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#94A3B8] mb-4">Services</h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link href={`/services#${service.id}`} className="text-sm text-[#94A3B8] hover:text-white transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#94A3B8] mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#94A3B8] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/quote" className="text-sm text-[#06B6D4] hover:text-[#0891B2] font-medium transition-colors">
                  Get Instant Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact — NAP compliant */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#94A3B8] mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-[#94A3B8]">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#06B6D4]" />
                <span>{BUSINESS.address}, {BUSINESS.city}, {BUSINESS.province} {BUSINESS.postalCode}</span>
              </li>
              <li>
                <a href={`tel:${BUSINESS.phoneRaw}`} className="flex items-center gap-3 text-[#94A3B8] hover:text-white transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0 text-[#06B6D4]" />
                  {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-3 text-[#94A3B8] hover:text-white transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0 text-[#06B6D4]" />
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-[#94A3B8]">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#06B6D4]" />
                <div>
                  {Object.entries(BUSINESS.hours).map(([day, hours]) => (
                    <div key={day}>
                      <span className="font-medium text-[#F8FAFC]">{day}:</span> {hours}
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#94A3B8]">
            &copy; {new Date().getFullYear()} Ming Wireless. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#94A3B8]">
            <Link href="/iphone-repair-toronto" className="hover:text-white transition-colors">iPhone Repair</Link>
            <Link href="/samsung-repair-toronto" className="hover:text-white transition-colors">Samsung Repair</Link>
            <Link href="/macbook-repair-toronto" className="hover:text-white transition-colors">MacBook Repair</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

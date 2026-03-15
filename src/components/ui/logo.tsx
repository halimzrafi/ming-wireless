"use client";

/**
 * Ming Wireless Logo
 *
 * "Ming" (明) = 日 (sun) + 月 (moon) = "Bright / Brilliant"
 * The logo mark fuses the Chinese character 明 with wireless signal arcs,
 * symbolizing "brilliant connectivity."
 *
 * Colors: Orange (#F59E0B → #F97316) from the original brand identity.
 */

export function LogoMark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
        <linearGradient id="wave-grad" x1="24" y1="4" x2="24" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Rounded square background */}
      <rect x="0" y="0" width="48" height="48" rx="12" fill="url(#logo-grad)" />

      {/* Stylized 明 character — left half: 日 (sun), right half: 月 (moon) */}
      {/* Sun radical 日 — left */}
      <rect x="8" y="16" width="13" height="22" rx="1.5" stroke="white" strokeWidth="2.2" fill="none" />
      <line x1="8" y1="23" x2="21" y2="23" stroke="white" strokeWidth="1.8" />
      <line x1="8" y1="30" x2="21" y2="30" stroke="white" strokeWidth="1.8" />

      {/* Moon radical 月 — right */}
      <rect x="26" y="16" width="13" height="22" rx="1.5" stroke="white" strokeWidth="2.2" fill="none" />
      <line x1="26" y1="24" x2="39" y2="24" stroke="white" strokeWidth="1.8" />
      <line x1="26" y1="31" x2="39" y2="31" stroke="white" strokeWidth="1.8" />
      {/* Moon's characteristic curved stroke on the left side */}
      <path d="M26 20 Q23.5 27 26 34" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Wireless signal arcs emanating from top-center */}
      <path d="M20 12 Q24 8 28 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.95" />
      <path d="M17 8 Q24 2 31 8" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <div className="flex flex-col leading-none">
        <span className="text-lg font-black tracking-tight">
          Ming<span className="text-[#F59E0B]">Wireless</span>
        </span>
        <span className="text-[0.55rem] font-medium tracking-[0.2em] uppercase text-[#94A3B8]">
          明 · Brilliant Connectivity
        </span>
      </div>
    </div>
  );
}

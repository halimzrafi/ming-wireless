"use client";

/**
 * Ming Wireless Logo
 *
 * Abstract mark: A bright diamond/light point emitting wireless signal arcs.
 * Symbolizes "ming" (bright/brilliant) + "wireless" (connectivity).
 * No text or Chinese characters — pure geometric abstraction.
 *
 * Brand gradient: Orange (#F59E0B → #F97316) from the original identity.
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
        <linearGradient id="logo-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>

      {/* Rounded square background */}
      <rect x="0" y="0" width="48" height="48" rx="12" fill="url(#logo-bg)" />

      {/* Central bright diamond — "Ming" = brightness */}
      <path d="M24 20 L28 26 L24 32 L20 26 Z" fill="white" />

      {/* Light rays radiating from diamond */}
      <line x1="24" y1="16" x2="24" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="30.5" y1="20" x2="33.5" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="17.5" y1="20" x2="14.5" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />

      {/* Wireless signal arcs — connectivity */}
      <path d="M14 34 Q24 28 34 34" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9" />
      <path d="M10 39 Q24 31 38 39" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

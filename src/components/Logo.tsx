import React from 'react';

type Props = {
  className?: string;
};

// Kubestronaut glyph inside a blue gradient square, tuned for small sizes
export default function Logo({ className = '' }: Props) {
  const base =
    'w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 to-sky-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:shadow-blue-500/40 transition-all duration-300 motion-safe:group-hover:scale-105';
  return (
    <div className={`${base} ${className}`} aria-hidden="true">
      <svg
        className="w-10 h-10 sm:w-12 sm:h-12 text-white"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Helmet outline */}
        <circle cx="12" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
        {/* Visor */}
        <circle cx="12" cy="10" r="4" fill="currentColor" />
        {/* Shine */}
        <ellipse cx="9.6" cy="7.9" rx="1.1" ry="1.6" fill="#ffffff" opacity="0.4" />
        {/* Body */}
        <rect x="9.2" y="14.2" width="5.6" height="5.6" rx="2.8" fill="currentColor" />
        {/* Arms */}
        <circle cx="6.8" cy="15.5" r="1.6" fill="currentColor" />
        <circle cx="17.2" cy="15.5" r="1.6" fill="currentColor" />
      </svg>
    </div>
  );
}

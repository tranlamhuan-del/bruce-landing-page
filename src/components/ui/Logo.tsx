"use client";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <svg
        width="36"
        height="44"
        viewBox="0 0 36 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Rounded frame */}
        <rect
          x="1"
          y="1"
          width="34"
          height="34"
          rx="8"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary"
        />
        {/* B letter */}
        <text
          x="6"
          y="25"
          fill="currentColor"
          className="text-on-surface"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="600"
          fontSize="18"
          letterSpacing="-0.03em"
        >
          B
        </text>
        {/* T letter */}
        <text
          x="18"
          y="25"
          fill="currentColor"
          className="text-primary"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="600"
          fontSize="18"
          letterSpacing="-0.03em"
        >
          T
        </text>
        {/* 3 dots — Bruce, Tiên, Betty */}
        <circle cx="11" cy="40" r="2" fill="currentColor" className="text-primary" />
        <circle cx="18" cy="40" r="2" fill="currentColor" className="text-secondary" />
        <circle cx="25" cy="40" r="2" fill="currentColor" className="text-tertiary" />
      </svg>
    </div>
  );
}

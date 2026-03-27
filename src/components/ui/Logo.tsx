"use client";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {/* Monogram BT - Stoic geometric style */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Outer frame - thin architectural border */}
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary-fixed"
        />
        {/* Inner accent line */}
        <rect
          x="3.5"
          y="3.5"
          width="33"
          height="33"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-outline-variant"
        />
        {/* B letter - left side */}
        <text
          x="11"
          y="28"
          fill="currentColor"
          className="text-on-surface"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
          fontSize="20"
          letterSpacing="-0.04em"
        >
          B
        </text>
        {/* T letter - right side, slightly overlapping */}
        <text
          x="22"
          y="28"
          fill="currentColor"
          className="text-primary-fixed"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
          fontSize="20"
          letterSpacing="-0.04em"
        >
          T
        </text>
      </svg>
    </div>
  );
}

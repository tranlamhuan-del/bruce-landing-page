"use client";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Rounded frame — Scandinavian minimal */}
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
      </svg>
      <span className="font-[family-name:var(--font-headline)] font-semibold text-on-surface text-sm tracking-wide">
        Bruce Tran
      </span>
    </div>
  );
}

"use client";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
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
        {/* B designed to echo "3" — emphasized curves */}
        <path
          d="M10 8h5.5c2.5 0 4.5 1.2 4.5 3.8 0 2-1.2 3.2-3 3.6v0.2c2.2 0.3 3.8 1.8 3.8 4 0 3-2.2 4.6-5.2 4.6H10V8z
             M13 14.5h2.2c1.8 0 2.8-0.8 2.8-2.3 0-1.5-1.1-2.2-2.8-2.2H13v4.5z
             M13 22.2h2.6c2 0 3.2-1 3.2-2.7 0-1.7-1.2-2.7-3.2-2.7H13v5.4z"
          fill="currentColor"
          className="text-on-surface"
        />
        {/* T — positioned right, primary color */}
        <text
          x="21"
          y="25"
          fill="currentColor"
          className="text-primary"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="600"
          fontSize="17"
          letterSpacing="-0.03em"
        >
          T
        </text>
      </svg>
    </div>
  );
}

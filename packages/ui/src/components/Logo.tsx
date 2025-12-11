import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const logoVariants = cva("flex font-semibold text-primary", {
  variants: {
    variant: {
      large:
        "flex-col items-center gap-2 sm:gap-3 text-3xl sm:text-4xl lg:text-5xl", // Responsive stacked logo
      small: "items-center gap-1.5 sm:gap-2 text-base sm:text-lg lg:text-xl", // Responsive horizontal logo
    },
  },
  defaultVariants: {
    variant: "small",
  },
});

interface LogoProps extends VariantProps<typeof logoVariants> {
  className?: string;
}

function CalendarIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M3 10h18" stroke="currentColor" strokeWidth="2"/>
      <rect x="14" y="14" width="4" height="4" rx="0.5" fill="currentColor"/>
    </svg>
  );
}

export function Logo({ variant, className }: LogoProps) {
  const iconSize =
    variant === "large"
      ? { mobile: 40, desktop: 48 }
      : { mobile: 20, desktop: 24 };

  return (
    <div className={cn(logoVariants({ variant }), className)}>
      {/* Mobile icon size */}
      <CalendarIcon size={iconSize.mobile} className="sm:hidden" />
      {/* Desktop icon size */}
      <CalendarIcon size={iconSize.desktop} className="hidden sm:block" />
      <span>EventEase</span>
    </div>
  );
}
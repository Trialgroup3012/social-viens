"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * GoldButton — Primary CTA button (Spec §10.2)
 *
 * Two variants:
 *   - default: gold gradient bg, warm-black text, btn-shine sweep on hover
 *   - outline: transparent bg, gold border, gold text, hover fill
 *
 * Three sizes: sm, md, lg
 *
 * Renders as <Link> if href provided, otherwise <button>.
 * Has the btn-shine sweep effect on hover.
 */
const goldButtonVariants = cva(
  "btn-shine inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f080a] disabled:pointer-events-none disabled:opacity-50 rounded-lg",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#D4AF37] to-[#F5D680] text-[#0f080a] hover:shadow-xl hover:shadow-[#D4AF37]/25 hover:scale-[1.02]",
        outline:
          "border-2 border-[#D4AF37] text-[#D4AF37] bg-transparent hover:bg-[#D4AF37] hover:text-[#0f080a] hover:shadow-lg hover:shadow-[#D4AF37]/20",
        solid: "bg-[#D4AF37] text-[#0f080a] hover:bg-[#F5D680] hover:shadow-lg hover:shadow-[#D4AF37]/30",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface GoldButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof goldButtonVariants> {
  href?: string;
  external?: boolean;
}

const GoldButton = React.forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ className, variant, size, href, external, children, ...props }, ref) => {
    const classes = cn(goldButtonVariants({ variant, size, className }));

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
GoldButton.displayName = "GoldButton";

export { GoldButton, goldButtonVariants };

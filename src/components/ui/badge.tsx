import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Functional, informational badges only (no shadows, no filler)
const badgeVariants = cva(
  "inline-flex items-center rounded px-2.5 py-0.5 text-xs font-bold transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground border border-border",
        accent:
          "bg-accent text-accent-foreground font-extrabold tracking-wide",
        outline:
          "border border-border text-foreground bg-transparent",
        success:
          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        quality:
          "bg-sky-500/15 text-sky-300 border border-sky-500/30 font-semibold tracking-wider",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

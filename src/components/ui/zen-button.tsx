import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const zenButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-soft hover:shadow-glow hover:scale-105",
        destructive: "bg-destructive text-destructive-foreground shadow-soft hover:shadow-lg",
        outline: "border-2 border-primary/30 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:shadow-soft",
        secondary: "bg-secondary text-secondary-foreground shadow-soft hover:shadow-glow hover:scale-105",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-full",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-hero text-white shadow-mystical hover:shadow-glow hover:scale-110 border border-white/20 backdrop-blur-sm",
        zen: "bg-gradient-calm text-calm-foreground shadow-healing hover:shadow-mystical hover:scale-105 animate-float",
        breathing: "bg-gradient-healing text-healing-foreground shadow-healing hover:shadow-glow animate-breathe",
        mystical: "bg-gradient-mystical text-accent-foreground shadow-mystical hover:shadow-glow animate-glow-pulse"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-xl px-3",
        lg: "h-14 rounded-2xl px-8 text-base",
        xl: "h-16 rounded-3xl px-12 text-lg",
        icon: "h-10 w-10",
        floating: "h-12 w-12 rounded-full shadow-mystical hover:shadow-glow"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ZenButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof zenButtonVariants> {
  asChild?: boolean;
}

const ZenButton = React.forwardRef<HTMLButtonElement, ZenButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(zenButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
ZenButton.displayName = "ZenButton";

export { ZenButton, zenButtonVariants };
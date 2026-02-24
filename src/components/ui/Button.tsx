"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          {
            "bg-golden-400 text-navy-900 hover:bg-golden-500 focus:ring-golden-400 shadow-lg hover:shadow-xl":
              variant === "primary",
            "bg-navy-800 text-white hover:bg-navy-700 focus:ring-navy-600":
              variant === "secondary",
            "border-2 border-golden-400 text-golden-400 hover:bg-golden-400 hover:text-navy-900 focus:ring-golden-400":
              variant === "outline",
            "text-navy-800 hover:bg-navy-50 focus:ring-navy-200":
              variant === "ghost",
          },
          {
            "text-sm px-4 py-2": size === "sm",
            "text-base px-6 py-3": size === "md",
            "text-lg px-8 py-4": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

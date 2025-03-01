
import React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center font-medium transition-all rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1B2A4A] focus:ring-[#2DD4BF] active:scale-[0.98] transform transition-transform duration-100",
  {
    variants: {
      variant: {
        primary: "bg-[#2DD4BF] text-[#0A192F] hover:bg-[#25C4B3] shadow-sm",
        secondary: "bg-[#243B67] text-white hover:bg-[#2D4A80] shadow-sm",
        outline: "bg-transparent border border-[#3A5380] text-white hover:bg-[#243B67]/10",
        ghost: "bg-transparent text-white hover:bg-[#243B67]/10",
        icon: "bg-transparent p-2 text-white hover:bg-[#243B67]/10 rounded-full",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg",
        default: "px-4 py-2",
        icon: "p-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "icon";
  size?: "sm" | "md" | "lg" | "default" | "icon";
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, isLoading = false, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size }),
          isLoading && "opacity-70 cursor-not-allowed",
          className
        )}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export default Button;

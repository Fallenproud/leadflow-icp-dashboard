
import React from "react";
import { cn } from "@/lib/utils";

interface CardContainerProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  animationDelay?: string;
}

const CardContainer: React.FC<CardContainerProps> = ({
  className,
  children,
  title,
  subtitle,
  animationDelay = "",
}) => {
  return (
    <div className={cn(
      "card-container slide-up", 
      animationDelay,
      className
    )}>
      {title && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          {subtitle && (
            <p className="text-[#94A3B8] mt-1 text-sm">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default CardContainer;

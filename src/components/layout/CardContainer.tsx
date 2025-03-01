
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardContainerProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  animationDelay?: string;
  imageUrl?: string;
  imageAlt?: string;
}

const CardContainer: React.FC<CardContainerProps> = ({
  className,
  children,
  title,
  subtitle,
  animationDelay = "",
  imageUrl,
  imageAlt = "Illustration",
}) => {
  return (
    <div className={cn(
      "card-container slide-up relative overflow-hidden", 
      animationDelay,
      className
    )}>
      {imageUrl && (
        <div className="absolute right-0 top-0 h-32 w-32 opacity-15 pointer-events-none">
          <img 
            src={imageUrl}
            alt={imageAlt}
            className="object-cover w-full h-full"
          />
        </div>
      )}
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

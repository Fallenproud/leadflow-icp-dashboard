
import React from "react";
import { cn } from "@/lib/utils";

interface DashboardContainerProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  className,
  children,
  title,
}) => {
  return (
    <div className={cn("dashboard-container", className)}>
      {title && (
        <div className="mb-8 text-center animate-in">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
        </div>
      )}
      {children}
    </div>
  );
};

export default DashboardContainer;

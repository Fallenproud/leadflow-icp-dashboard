
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  error?: string;
  options: Option[];
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, label, required, error, options, ...props }, ref) => {
    return (
      <div className="form-group">
        {label && (
          <label 
            htmlFor={props.id} 
            className={cn("text-white", required ? "required" : "")}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            className={cn(
              "appearance-none pr-10 transition-all duration-300 ease-in-out",
              error ? "border-red-500 focus:ring-red-500" : "",
              className
            )}
            ref={ref}
            {...props}
          >
            <option value="" disabled>
              Select an option
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white opacity-70 w-5 h-5 pointer-events-none" />
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormSelect;

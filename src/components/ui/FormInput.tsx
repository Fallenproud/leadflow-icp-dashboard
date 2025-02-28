
import React from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
  icon?: React.ReactNode;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, required, error, icon, ...props }, ref) => {
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
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            className={cn(
              "transition-all duration-300 ease-in-out",
              icon ? "pl-10" : "",
              error ? "border-red-500 focus:ring-red-500" : "",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;

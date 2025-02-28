
import React from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, required, error, ...props }, ref) => {
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
        <input
          className={cn(
            "transition-all duration-300 ease-in-out",
            error ? "border-red-500 focus:ring-red-500" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;

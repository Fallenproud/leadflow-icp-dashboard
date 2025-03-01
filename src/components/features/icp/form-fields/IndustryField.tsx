
"use client";

import React from "react";
import { Building } from "lucide-react";
import FormInput from "@/components/ui/FormInput";
import { FormFieldChangeHandler } from "../types";

interface IndustryFieldProps {
  value: string;
  error?: string;
  onChange: FormFieldChangeHandler;
}

const IndustryField: React.FC<IndustryFieldProps> = ({ value, error, onChange }) => {
  return (
    <FormInput
      id="targetIndustries"
      name="targetIndustries"
      label="Target Industries"
      placeholder="E.g. SaaS, Fintech, Healthcare (comma separated)"
      required
      value={value}
      onChange={onChange}
      error={error}
      icon={<Building className="w-5 h-5 text-[#94A3B8]" />}
    />
  );
};

export default IndustryField;

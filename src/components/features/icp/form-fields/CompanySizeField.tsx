
"use client";

import React from "react";
import FormSelect from "@/components/ui/FormSelect";
import { FormFieldChangeHandler, companySizeOptions } from "../types";

interface CompanySizeFieldProps {
  value: string;
  error?: string;
  onChange: FormFieldChangeHandler;
}

const CompanySizeField: React.FC<CompanySizeFieldProps> = ({ value, error, onChange }) => {
  return (
    <FormSelect
      id="companySize"
      name="companySize"
      label="Company Size"
      required
      value={value}
      onChange={onChange}
      error={error}
      options={companySizeOptions}
    />
  );
};

export default CompanySizeField;

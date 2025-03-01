
"use client";

import React from "react";
import FormSelect from "@/components/ui/FormSelect";
import { FormFieldChangeHandler, revenueOptions } from "../types";

interface RevenueFieldProps {
  value: string;
  error?: string;
  onChange: FormFieldChangeHandler;
}

const RevenueField: React.FC<RevenueFieldProps> = ({ value, error, onChange }) => {
  return (
    <FormSelect
      id="annualRevenue"
      name="annualRevenue"
      label="Annual Revenue"
      required
      value={value}
      onChange={onChange}
      error={error}
      options={revenueOptions}
    />
  );
};

export default RevenueField;

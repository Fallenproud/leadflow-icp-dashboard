
"use client";

import React from "react";
import FormSelect from "@/components/ui/FormSelect";
import { FormFieldChangeHandler, industryOptions } from "../types";

interface IndustryFieldProps {
  value: string;
  error?: string;
  onChange: FormFieldChangeHandler;
}

const IndustryField: React.FC<IndustryFieldProps> = ({ value, error, onChange }) => {
  return (
    <FormSelect
      id="industry"
      name="industry"
      label="Target Industry"
      required
      value={value}
      onChange={onChange}
      error={error}
      options={industryOptions}
    />
  );
};

export default IndustryField;

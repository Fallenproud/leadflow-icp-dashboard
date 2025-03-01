
"use client";

import React from "react";
import { Search } from "lucide-react";
import FormInput from "@/components/ui/FormInput";
import { FormFieldChangeHandler } from "../types";

interface SearchUrlFieldProps {
  value: string;
  error?: string;
  onChange: FormFieldChangeHandler;
}

const SearchUrlField: React.FC<SearchUrlFieldProps> = ({ value, error, onChange }) => {
  return (
    <FormInput
      id="searchUrl"
      name="searchUrl"
      label="Search URL"
      placeholder="https://www.linkedin.com/search/results/..."
      required
      value={value}
      onChange={onChange}
      error={error}
      icon={<Search className="w-5 h-5 text-[#94A3B8]" />}
    />
  );
};

export default SearchUrlField;

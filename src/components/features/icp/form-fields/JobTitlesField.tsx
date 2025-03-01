
"use client";

import React from "react";
import { Users } from "lucide-react";
import FormInput from "@/components/ui/FormInput";
import { FormFieldChangeHandler } from "../types";

interface JobTitlesFieldProps {
  value: string;
  error?: string;
  onChange: FormFieldChangeHandler;
}

const JobTitlesField: React.FC<JobTitlesFieldProps> = ({ value, error, onChange }) => {
  return (
    <FormInput
      id="targetJobTitles"
      name="targetJobTitles"
      label="Target Job Titles"
      placeholder="E.g. CTO, VP Engineering, Director (comma separated)"
      required
      value={value}
      onChange={onChange}
      error={error}
      icon={<Users className="w-5 h-5 text-[#94A3B8]" />}
    />
  );
};

export default JobTitlesField;

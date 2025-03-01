
"use client";

import React from "react";
import { Hash } from "lucide-react";
import FormInput from "@/components/ui/FormInput";
import { FormFieldChangeHandler } from "../types";

interface CampaignIdFieldProps {
  value: string;
  error?: string;
  onChange: FormFieldChangeHandler;
}

const CampaignIdField: React.FC<CampaignIdFieldProps> = ({ value, error, onChange }) => {
  return (
    <FormInput
      id="campaignId"
      name="campaignId"
      label="Campaign ID"
      placeholder="Enter campaign identifier"
      required
      value={value}
      onChange={onChange}
      error={error}
      icon={<Hash className="w-5 h-5 text-[#94A3B8]" />}
    />
  );
};

export default CampaignIdField;

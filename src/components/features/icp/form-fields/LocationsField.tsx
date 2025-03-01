
"use client";

import React from "react";
import { MapPin } from "lucide-react";
import FormInput from "@/components/ui/FormInput";
import { FormFieldChangeHandler } from "../types";

interface LocationsFieldProps {
  value: string;
  error?: string;
  onChange: FormFieldChangeHandler;
}

const LocationsField: React.FC<LocationsFieldProps> = ({ value, error, onChange }) => {
  return (
    <FormInput
      id="targetLocations"
      name="targetLocations"
      label="Target Locations"
      placeholder="E.g. USA, EU, APAC (comma separated)"
      required
      value={value}
      onChange={onChange}
      error={error}
      icon={<MapPin className="w-5 h-5 text-[#94A3B8]" />}
    />
  );
};

export default LocationsField;

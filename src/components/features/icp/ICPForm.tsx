
"use client";

import React from "react";
import { FormData, ErrorState } from "./types";
import IndustryField from "./form-fields/IndustryField";
import CompanySizeField from "./form-fields/CompanySizeField";
import RevenueField from "./form-fields/RevenueField";
import LocationsField from "./form-fields/LocationsField";
import JobTitlesField from "./form-fields/JobTitlesField";
import { Button } from "@/components/ui/button";

interface ICPFormProps {
  formData: FormData;
  errors: ErrorState;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ICPForm: React.FC<ICPFormProps> = ({
  formData,
  errors,
  isSubmitting,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <IndustryField
        value={formData.targetIndustries}
        error={errors.targetIndustries}
        onChange={handleChange}
      />
      
      <CompanySizeField
        value={formData.companySize}
        error={errors.companySize}
        onChange={handleChange}
      />
      
      <RevenueField
        value={formData.annualRevenue}
        error={errors.annualRevenue}
        onChange={handleChange}
      />
      
      <LocationsField
        value={formData.targetLocations}
        error={errors.targetLocations}
        onChange={handleChange}
      />
      
      <JobTitlesField
        value={formData.targetJobTitles}
        error={errors.targetJobTitles}
        onChange={handleChange}
      />
      
      <div className="mt-8">
        <Button 
          type="submit" 
          className="w-full" 
          size="lg"
          isLoading={isSubmitting}
        >
          Start ICP Search
        </Button>
      </div>
    </form>
  );
};

export default ICPForm;

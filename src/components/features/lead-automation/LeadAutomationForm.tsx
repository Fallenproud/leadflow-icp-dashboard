
"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import SearchUrlField from "./form-fields/SearchUrlField";
import CampaignIdField from "./form-fields/CampaignIdField";
import WorkspaceField from "./form-fields/WorkspaceField";
import IndustryField from "./form-fields/IndustryField";
import useLeadAutomationFormLogic from "./useLeadAutomationFormLogic";
import { useConfiguration } from "@/contexts/ConfigurationContext";

const LeadAutomationForm: React.FC = () => {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } = useLeadAutomationFormLogic();
  const { updateLeadData } = useConfiguration();
  
  // Update the context whenever formData changes
  useEffect(() => {
    updateLeadData(formData);
  }, [formData, updateLeadData]);

  return (
    <form onSubmit={handleSubmit}>
      <SearchUrlField
        value={formData.searchUrl}
        error={errors.searchUrl}
        onChange={handleChange}
      />
      
      <CampaignIdField
        value={formData.campaignId}
        error={errors.campaignId}
        onChange={handleChange}
      />
      
      <WorkspaceField
        value={formData.workspace}
        error={errors.workspace}
        onChange={handleChange}
      />
      
      <IndustryField
        value={formData.industry}
        error={errors.industry}
        onChange={handleChange}
      />
      
      <div className="mt-8">
        <Button 
          type="submit" 
          className="w-full"
          size="lg"
          isLoading={isSubmitting}
        >
          Start Automation
        </Button>
      </div>
    </form>
  );
};

export default LeadAutomationForm;

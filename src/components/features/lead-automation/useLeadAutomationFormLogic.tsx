
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FormData, ErrorState } from "./types";

export const useLeadAutomationFormLogic = () => {
  const [formData, setFormData] = useState<FormData>({
    searchUrl: "",
    campaignId: "",
    workspace: "",
    industry: "",
  });

  const [errors, setErrors] = useState<ErrorState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ErrorState = {};
    
    if (!formData.searchUrl) {
      newErrors.searchUrl = "Search URL is required";
    } else if (!formData.searchUrl.startsWith("http")) {
      newErrors.searchUrl = "Please enter a valid URL";
    }
    
    if (!formData.campaignId) {
      newErrors.campaignId = "Campaign ID is required";
    }
    
    if (!formData.workspace) {
      newErrors.workspace = "Please select a workspace";
    }
    
    if (!formData.industry) {
      newErrors.industry = "Please select an industry";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Lead automation started successfully", {
        description: "You will be notified once the process completes."
      });
      
      setFormData({
        searchUrl: "",
        campaignId: "",
        workspace: "",
        industry: "",
      });
    } catch (error) {
      toast.error("Failed to start automation", {
        description: "Please try again or contact support."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};

export default useLeadAutomationFormLogic;

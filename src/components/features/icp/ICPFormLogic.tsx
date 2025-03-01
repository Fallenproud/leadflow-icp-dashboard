
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FormData, ErrorState } from "./types";

export const useICPFormLogic = () => {
  const [formData, setFormData] = useState<FormData>({
    targetIndustries: "",
    companySize: "",
    annualRevenue: "",
    targetLocations: "",
    targetJobTitles: "",
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
    
    if (!formData.targetIndustries) {
      newErrors.targetIndustries = "Target industries are required";
    }
    
    if (!formData.companySize) {
      newErrors.companySize = "Company size is required";
    }
    
    if (!formData.annualRevenue) {
      newErrors.annualRevenue = "Annual revenue is required";
    }
    
    if (!formData.targetLocations) {
      newErrors.targetLocations = "Target locations are required";
    }
    
    if (!formData.targetJobTitles) {
      newErrors.targetJobTitles = "Target job titles are required";
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
      
      toast.success("ICP search started successfully", {
        description: "Your search is in progress. Results will be available soon."
      });
      
      setFormData({
        targetIndustries: "",
        companySize: "",
        annualRevenue: "",
        targetLocations: "",
        targetJobTitles: "",
      });
    } catch (error) {
      toast.error("Failed to start ICP search", {
        description: "Please check your configuration and try again."
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
    handleSubmit
  };
};

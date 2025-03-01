
import React, { useState } from "react";
import { Building, DollarSign, MapPin, Users } from "lucide-react";
import CardContainer from "@/components/layout/CardContainer";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const companySizeOptions = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1001+", label: "1001+ employees" },
];

const revenueOptions = [
  { value: "<1M", label: "Less than $1M" },
  { value: "1M-10M", label: "1M-10M" },
  { value: "10M-50M", label: "10M-50M" },
  { value: "50M-100M", label: "50M-100M" },
  { value: "100M+", label: "100M+" },
];

interface FormData {
  targetIndustries: string;
  companySize: string;
  annualRevenue: string;
  targetLocations: string;
  targetJobTitles: string;
}

const ICPConfiguration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    targetIndustries: "",
    companySize: "",
    annualRevenue: "",
    targetLocations: "",
    targetJobTitles: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
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
    const newErrors: Partial<FormData> = {};
    
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

  return (
    <CardContainer 
      title="ICP Configuration" 
      subtitle="Define your Ideal Customer Profile for targeted lead generation"
      animationDelay="delay-200"
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          id="targetIndustries"
          name="targetIndustries"
          label="Target Industries"
          placeholder="E.g. SaaS, Fintech, Healthcare (comma separated)"
          required
          value={formData.targetIndustries}
          onChange={handleChange}
          error={errors.targetIndustries}
          icon={<Building className="w-5 h-5 text-[#94A3B8]" />}
        />
        
        <FormSelect
          id="companySize"
          name="companySize"
          label="Company Size"
          required
          value={formData.companySize}
          onChange={handleChange}
          error={errors.companySize}
          options={companySizeOptions}
        />
        
        <FormSelect
          id="annualRevenue"
          name="annualRevenue"
          label="Annual Revenue"
          required
          value={formData.annualRevenue}
          onChange={handleChange}
          error={errors.annualRevenue}
          options={revenueOptions}
        />
        
        <FormInput
          id="targetLocations"
          name="targetLocations"
          label="Target Locations"
          placeholder="E.g. USA, EU, APAC (comma separated)"
          required
          value={formData.targetLocations}
          onChange={handleChange}
          error={errors.targetLocations}
          icon={<MapPin className="w-5 h-5 text-[#94A3B8]" />}
        />
        
        <FormInput
          id="targetJobTitles"
          name="targetJobTitles"
          label="Target Job Titles"
          placeholder="E.g. CTO, VP Engineering, Director (comma separated)"
          required
          value={formData.targetJobTitles}
          onChange={handleChange}
          error={errors.targetJobTitles}
          icon={<Users className="w-5 h-5 text-[#94A3B8]" />}
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
    </CardContainer>
  );
};

export default ICPConfiguration;

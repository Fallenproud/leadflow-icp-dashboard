
import React, { useState } from "react";
import { Search, Briefcase, Hash } from "lucide-react";
import CardContainer from "@/components/layout/CardContainer";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const workspaceOptions = [
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
  { value: "product", label: "Product" },
  { value: "engineering", label: "Engineering" },
];

const industryOptions = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
];

interface FormData {
  searchUrl: string;
  campaignId: string;
  workspace: string;
  industry: string;
}

const LeadAutomation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    searchUrl: "",
    campaignId: "",
    workspace: "",
    industry: "",
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

  return (
    <CardContainer 
      title="Lead Automation" 
      subtitle="Configure and start your lead generation automation"
      animationDelay="delay-100"
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          id="searchUrl"
          name="searchUrl"
          label="Search URL"
          placeholder="https://www.linkedin.com/search/results/..."
          required
          value={formData.searchUrl}
          onChange={handleChange}
          error={errors.searchUrl}
          icon={<Search className="w-5 h-5 text-[#94A3B8]" />}
        />
        
        <FormInput
          id="campaignId"
          name="campaignId"
          label="Campaign ID"
          placeholder="Enter campaign identifier"
          required
          value={formData.campaignId}
          onChange={handleChange}
          error={errors.campaignId}
          icon={<Hash className="w-5 h-5 text-[#94A3B8]" />}
        />
        
        <FormSelect
          id="workspace"
          name="workspace"
          label="Instantly Workspace"
          required
          value={formData.workspace}
          onChange={handleChange}
          error={errors.workspace}
          options={workspaceOptions}
        />
        
        <FormSelect
          id="industry"
          name="industry"
          label="Target Industry"
          required
          value={formData.industry}
          onChange={handleChange}
          error={errors.industry}
          options={industryOptions}
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
    </CardContainer>
  );
};

export default LeadAutomation;

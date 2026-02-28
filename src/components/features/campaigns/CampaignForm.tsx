
import React, { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CampaignFormData, CampaignErrors } from "./types";
import { createCampaign, updateCampaign } from "@/services/campaignService";
import { industryOptions } from "../lead-automation/types";

interface CampaignFormProps {
  initialData?: Partial<CampaignFormData>;
  campaignId?: string;
  isEditing?: boolean;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  initialData = {},
  campaignId,
  isEditing = false,
}) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<CampaignFormData>({
    name: initialData.name || "",
    description: initialData.description || "",
    industries: initialData.industries || [],
    minCompanySize: initialData.minCompanySize || 0,
    maxCompanySize: initialData.maxCompanySize || 1000,
    locations: initialData.locations || [],
    subject: initialData.subject || "",
    template: initialData.template || "",
    startDate: initialData.startDate || new Date().toISOString().split('T')[0],
    endDate: initialData.endDate || null,
    frequency: initialData.frequency || "weekly",
  });
  
  const [errors, setErrors] = useState<CampaignErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof CampaignFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      industries: selectedOptions
    }));
    
    if (errors.industries) {
      setErrors(prev => ({ ...prev, industries: undefined }));
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simplified for demo: assuming comma-separated locations
    const locations = e.target.value.split(',').map(loc => loc.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      locations
    }));
    
    if (errors.locations) {
      setErrors(prev => ({ ...prev, locations: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: CampaignErrors = {};
    
    if (!formData.name) {
      newErrors.name = "Campaign name is required";
    }
    
    if (!formData.description) {
      newErrors.description = "Campaign description is required";
    }
    
    if (formData.industries.length === 0) {
      newErrors.industries = "At least one industry must be selected";
    }
    
    if (formData.minCompanySize < 0) {
      newErrors.minCompanySize = "Minimum company size cannot be negative";
    }
    
    if (formData.maxCompanySize <= formData.minCompanySize) {
      newErrors.maxCompanySize = "Maximum company size must be greater than minimum";
    }
    
    if (formData.locations.length === 0) {
      newErrors.locations = "At least one location must be specified";
    }
    
    if (!formData.subject) {
      newErrors.subject = "Email subject is required";
    }
    
    if (!formData.template) {
      newErrors.template = "Message template is required";
    }
    
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
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
      if (isEditing && campaignId) {
        await updateCampaign(campaignId, formData);
        toast.success("Campaign updated successfully");
      } else {
        await createCampaign(formData);
        toast.success("Campaign created successfully");
      }
      
      navigate("/lead-automation-and-icp-configuration/campaigns");
    } catch (error) {
      toast.error(isEditing ? "Failed to update campaign" : "Failed to create campaign");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="form-group">
            <label htmlFor="name" className="required text-white">Campaign Name</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter campaign name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="description" className="required text-white">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter campaign description"
              className={`bg-[#243B67] border border-[#3A5380] rounded-md px-4 py-2 w-full text-white min-h-[100px] ${errors.description ? "border-red-500" : ""}`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="industries" className="required text-white">Target Industries</label>
            <select
              id="industries"
              name="industries"
              value={formData.industries}
              onChange={handleIndustryChange}
              multiple
              className={`bg-[#243B67] border border-[#3A5380] rounded-md px-4 py-2 w-full text-white min-h-[100px] ${errors.industries ? "border-red-500" : ""}`}
            >
              {industryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-[#94A3B8] text-xs mt-1">Hold Ctrl/Cmd to select multiple industries</p>
            {errors.industries && <p className="text-red-500 text-xs mt-1">{errors.industries}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="minCompanySize" className="text-white">Min Company Size</label>
              <input
                id="minCompanySize"
                name="minCompanySize"
                type="number"
                value={formData.minCompanySize}
                onChange={handleChange}
                min="0"
                className={errors.minCompanySize ? "border-red-500" : ""}
              />
              {errors.minCompanySize && <p className="text-red-500 text-xs mt-1">{errors.minCompanySize}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="maxCompanySize" className="text-white">Max Company Size</label>
              <input
                id="maxCompanySize"
                name="maxCompanySize"
                type="number"
                value={formData.maxCompanySize}
                onChange={handleChange}
                min="0"
                className={errors.maxCompanySize ? "border-red-500" : ""}
              />
              {errors.maxCompanySize && <p className="text-red-500 text-xs mt-1">{errors.maxCompanySize}</p>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="locations" className="required text-white">Target Locations</label>
            <input
              id="locations"
              name="locations"
              value={formData.locations.join(', ')}
              onChange={handleLocationChange}
              placeholder="United States, Europe, Asia"
              className={errors.locations ? "border-red-500" : ""}
            />
            <p className="text-[#94A3B8] text-xs mt-1">Enter locations separated by commas</p>
            {errors.locations && <p className="text-red-500 text-xs mt-1">{errors.locations}</p>}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="form-group">
            <label htmlFor="subject" className="required text-white">Email Subject</label>
            <input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter email subject line"
              className={errors.subject ? "border-red-500" : ""}
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="template" className="required text-white">Message Template</label>
            <textarea
              id="template"
              name="template"
              value={formData.template}
              onChange={handleChange}
              placeholder="Enter your message template. Use {{firstName}}, {{companyName}}, etc. for personalization."
              className={`bg-[#243B67] border border-[#3A5380] rounded-md px-4 py-2 w-full text-white min-h-[200px] ${errors.template ? "border-red-500" : ""}`}
            />
            <p className="text-[#94A3B8] text-xs mt-1">Use {"{{firstName}}"}, {"{{companyName}}"}, etc. for personalization</p>
            {errors.template && <p className="text-red-500 text-xs mt-1">{errors.template}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="frequency" className="required text-white">Frequency</label>
            <select
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className={errors.frequency ? "border-red-500" : ""}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            {errors.frequency && <p className="text-red-500 text-xs mt-1">{errors.frequency}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="startDate" className="required text-white">Start Date</label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className={errors.startDate ? "border-red-500" : ""}
              />
              {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="endDate" className="text-white">End Date (Optional)</label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate || ""}
                onChange={handleChange}
                className={errors.endDate ? "border-red-500" : ""}
              />
              {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4 border-t border-[#3A5380]">
        <button
          type="button"
          onClick={() => navigate("/lead-automation-and-icp-configuration/campaigns")}
          className="px-4 py-2 text-white border border-[#3A5380] rounded-md hover:bg-[#243B67] transition-colors"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#2DD4BF] text-[#0A192F] rounded-md hover:bg-[#25C4B3] transition-colors flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#0A192F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isEditing ? "Updating Campaign..." : "Creating Campaign..."}
            </>
          ) : (
            <>{isEditing ? "Update Campaign" : "Create Campaign"}</>
          )}
        </button>
      </div>
    </form>
  );
};

export default CampaignForm;

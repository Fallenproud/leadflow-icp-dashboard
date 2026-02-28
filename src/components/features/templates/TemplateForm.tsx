
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Template, TemplateFormData } from "./types";
import { createTemplate, updateTemplate } from "@/services/templateService";
import { Plus, X, Mail, Linkedin, MessageSquare, Tag } from "lucide-react";
import { toast } from "sonner";

interface TemplateFormProps {
  initialData?: Partial<TemplateFormData>;
  templateId?: string;
  isEditing?: boolean;
}

const TemplateForm: React.FC<TemplateFormProps> = ({
  initialData = {},
  templateId,
  isEditing = false,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TemplateFormData>({
    name: initialData.name || "",
    category: initialData.category || "email",
    subject: initialData.subject || "",
    content: initialData.content || "",
    tags: initialData.tags || [],
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Template name is required";
    }
    
    if (formData.category === "email" && !formData.subject?.trim()) {
      newErrors.subject = "Subject is required for email templates";
    }
    
    if (!formData.content.trim()) {
      newErrors.content = "Template content is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCategoryChange = (category: Template["category"]) => {
    setFormData((prev) => ({
      ...prev,
      category,
      // Clear subject if not email
      subject: category === "email" ? prev.subject : ""
    }));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    
    if (!formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
    }
    
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (isEditing && templateId) {
        await updateTemplate(templateId, formData);
        toast.success("Template updated successfully");
      } else {
        await createTemplate(formData);
        toast.success("Template created successfully");
      }
      
      navigate("/lead-automation-and-icp-configuration/templates");
    } catch (error) {
      console.error("Error saving template:", error);
      toast.error("Failed to save template");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Template Name */}
      <div>
        <label htmlFor="name" className="block text-white font-medium mb-1">
          Template Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter a descriptive name"
          className={`bg-[#243B67] border border-[#3A5380] rounded-md px-4 py-2 w-full text-white ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Template Category */}
      <div>
        <label className="block text-white font-medium mb-1">
          Template Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => handleCategoryChange("email")}
            className={`flex items-center justify-center p-3 rounded-md border ${
              formData.category === "email"
                ? "bg-[#2DD4BF] text-[#0A192F] border-[#2DD4BF]"
                : "bg-[#243B67] text-white border-[#3A5380]"
            }`}
          >
            <Mail className="w-4 h-4 mr-2" />
            <span>Email</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleCategoryChange("linkedin")}
            className={`flex items-center justify-center p-3 rounded-md border ${
              formData.category === "linkedin"
                ? "bg-[#2DD4BF] text-[#0A192F] border-[#2DD4BF]"
                : "bg-[#243B67] text-white border-[#3A5380]"
            }`}
          >
            <Linkedin className="w-4 h-4 mr-2" />
            <span>LinkedIn</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleCategoryChange("message")}
            className={`flex items-center justify-center p-3 rounded-md border ${
              formData.category === "message"
                ? "bg-[#2DD4BF] text-[#0A192F] border-[#2DD4BF]"
                : "bg-[#243B67] text-white border-[#3A5380]"
            }`}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            <span>Message</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleCategoryChange("other")}
            className={`flex items-center justify-center p-3 rounded-md border ${
              formData.category === "other"
                ? "bg-[#2DD4BF] text-[#0A192F] border-[#2DD4BF]"
                : "bg-[#243B67] text-white border-[#3A5380]"
            }`}
          >
            <Tag className="w-4 h-4 mr-2" />
            <span>Other</span>
          </button>
        </div>
      </div>

      {/* Subject Line (only for email templates) */}
      {formData.category === "email" && (
        <div>
          <label htmlFor="subject" className="block text-white font-medium mb-1">
            Subject Line
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject || ""}
            onChange={handleChange}
            placeholder="Enter email subject line"
            className={`bg-[#243B67] border border-[#3A5380] rounded-md px-4 py-2 w-full text-white ${errors.subject ? "border-red-500" : ""}`}
          />
          <p className="text-[#94A3B8] text-xs mt-1">Use {"{{firstName}}"}, {"{{companyName}}"}, etc. for personalization</p>
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
        </div>
      )}

      {/* Template Content */}
      <div>
        <label htmlFor="content" className="block text-white font-medium mb-1">
          Template Content
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={8}
          placeholder="Enter your message template. Use {{firstName}}, {{companyName}}, etc. for personalization."
          className={`bg-[#243B67] border border-[#3A5380] rounded-md px-4 py-2 w-full text-white min-h-[200px] ${errors.content ? "border-red-500" : ""}`}
        />
        <p className="text-[#94A3B8] text-xs mt-1">Use {"{{firstName}}"}, {"{{companyName}}"}, etc. for personalization</p>
        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-white font-medium mb-1">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.tags.map((tag, index) => (
            <div key={index} className="bg-[#243B67] text-white px-3 py-1 rounded-md flex items-center">
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-[#94A3B8] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            id="tagInput"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInputKeyDown}
            placeholder="Add tags (press Enter)"
            className="bg-[#243B67] border border-[#3A5380] rounded-l-md px-4 py-2 flex-grow text-white"
          />
          <button
            type="button"
            onClick={addTag}
            className="bg-[#3A5380] text-white px-3 py-2 rounded-r-md hover:bg-[#4A6390] transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[#94A3B8] text-xs mt-1">Add tags to categorize your templates (e.g., cold, follow-up, introduction)</p>
      </div>

      {/* Submit and Cancel Buttons */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => navigate("/lead-automation-and-icp-configuration/templates")}
          className="px-4 py-2 bg-transparent border border-[#3A5380] text-white rounded-md hover:bg-[#243B67] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-[#2DD4BF] text-[#0A192F] rounded-md hover:bg-[#25C4B3] transition-colors flex items-center"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">&#9696;</span>
              <span>Saving...</span>
            </>
          ) : (
            <span>{isEditing ? "Update Template" : "Create Template"}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default TemplateForm;

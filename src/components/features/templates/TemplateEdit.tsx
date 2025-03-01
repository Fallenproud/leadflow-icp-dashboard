
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getTemplateById } from "@/services/templateService";
import { TemplateFormData } from "./types";
import TemplateForm from "./TemplateForm";
import { toast } from "sonner";

const TemplateEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<Partial<TemplateFormData>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const fetchTemplate = () => {
      const template = getTemplateById(id);
      if (!template) {
        toast.error("Template not found");
        navigate("/lead-automation-and-icp-configuration/templates");
        return;
      }
      
      setInitialData({
        name: template.name,
        category: template.category,
        subject: template.subject,
        content: template.content,
        tags: template.tags,
      });
      
      setIsLoading(false);
    };
    
    fetchTemplate();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2DD4BF]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in">
      <div className="mb-6">
        <Link
          to={`/lead-automation-and-icp-configuration/templates/${id}`}
          className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Template</span>
        </Link>
        <h1 className="text-2xl font-bold text-white">Edit Template</h1>
        <p className="text-[#94A3B8]">Update your message template</p>
      </div>
      
      <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-6">
        <TemplateForm
          initialData={initialData}
          templateId={id}
          isEditing={true}
        />
      </div>
    </div>
  );
};

export default TemplateEdit;

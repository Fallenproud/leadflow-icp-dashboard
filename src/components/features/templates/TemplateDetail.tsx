
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash2, Copy, Mail, Linkedin, MessageSquare, Tag } from "lucide-react";
import { Template } from "./types";
import { getTemplateById, deleteTemplate } from "@/services/templateService";
import { toast } from "sonner";
import { format } from "date-fns";

const TemplateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const fetchTemplate = async () => {
      const fetchedTemplate = await getTemplateById(id);
      if (!fetchedTemplate) {
        toast.error("Template not found");
        navigate("/lead-automation-and-icp-configuration/templates");
        return;
      }
      
      setTemplate(fetchedTemplate);
      setIsLoading(false);
    };
    
    fetchTemplate();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!template) return;
    
    if (window.confirm("Are you sure you want to delete this template?")) {
      await deleteTemplate(template.id);
      toast.success("Template deleted");
      navigate("/lead-automation-and-icp-configuration/templates");
    }
  };

  const handleCopyToClipboard = () => {
    if (!template) return;
    
    const content = template.category === 'email' 
      ? `Subject: ${template.subject}\n\n${template.content}`
      : template.content;
      
    navigator.clipboard.writeText(content).then(() => {
      toast.success("Template copied to clipboard");
    }).catch(() => {
      toast.error("Failed to copy template");
    });
  };

  const getCategoryIcon = () => {
    if (!template) return null;
    
    switch (template.category) {
      case 'email':
        return <Mail className="w-6 h-6 text-blue-400" />;
      case 'linkedin':
        return <Linkedin className="w-6 h-6 text-blue-500" />;
      case 'message':
        return <MessageSquare className="w-6 h-6 text-green-400" />;
      default:
        return <Tag className="w-6 h-6 text-purple-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2DD4BF]"></div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-white mb-2">Template not found</h3>
        <Link
          to="/lead-automation-and-icp-configuration/templates"
          className="text-[#2DD4BF] hover:underline"
        >
          Return to Templates
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Link
            to="/lead-automation-and-icp-configuration/templates"
            className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Templates</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">{template.name}</h1>
          <div className="flex items-center mt-1 text-[#94A3B8]">
            {getCategoryIcon()}
            <span className="ml-2 capitalize">{template.category}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleCopyToClipboard}
            className="inline-flex items-center px-4 py-2 bg-[#243B67] text-white rounded-md hover:bg-[#1B2A4A] transition-colors"
          >
            <Copy className="w-4 h-4 mr-2" />
            <span>Copy</span>
          </button>
          
          <Link
            to={`/lead-automation-and-icp-configuration/templates/${template.id}/edit`}
            className="inline-flex items-center px-4 py-2 bg-[#243B67] text-white rounded-md hover:bg-[#1B2A4A] transition-colors"
          >
            <Edit className="w-4 h-4 mr-2" />
            <span>Edit</span>
          </Link>
          
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            <span>Delete</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {template.category === 'email' && (
            <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Subject Line</h2>
              <div className="p-4 bg-[#243B67] rounded-md">
                <p className="text-white">{template.subject}</p>
              </div>
            </div>
          )}
          
          <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Template Content</h2>
            <div className="p-4 bg-[#243B67] rounded-md">
              <div className="whitespace-pre-wrap text-white">{template.content}</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Template Details</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-[#94A3B8] text-sm">Created</h3>
                <div className="text-white mt-1">
                  {format(new Date(template.createdAt), 'PPP')}
                </div>
              </div>
              
              <div>
                <h3 className="text-[#94A3B8] text-sm">Last Updated</h3>
                <div className="text-white mt-1">
                  {format(new Date(template.updatedAt), 'PPP')}
                </div>
              </div>
              
              <div>
                <h3 className="text-[#94A3B8] text-sm">Category</h3>
                <div className="flex items-center mt-1">
                  {getCategoryIcon()}
                  <span className="ml-2 text-white capitalize">{template.category}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Tags</h2>
            
            {template.tags.length === 0 ? (
              <p className="text-[#94A3B8]">No tags have been added</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag, index) => (
                  <div key={index} className="bg-[#243B67] text-white px-3 py-1 rounded-md">
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;

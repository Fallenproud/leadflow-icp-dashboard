
import React from "react";
import { Template } from "./types";
import { Edit, Trash2, MoreHorizontal, Copy, Mail, Linkedin, MessageSquare, Tag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { deleteTemplate } from "@/services/templateService";
import { toast } from "sonner";

interface TemplateListProps {
  templates: Template[];
}

const TemplateList: React.FC<TemplateListProps> = ({ templates }) => {
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      deleteTemplate(id);
      toast.success("Template deleted");
      // In a real app, we would update the state or refetch the data
      window.location.reload();
    }
  };

  const handleCopyToClipboard = (template: Template) => {
    const content = template.category === 'email' 
      ? `Subject: ${template.subject}\n\n${template.content}`
      : template.content;
      
    navigator.clipboard.writeText(content).then(() => {
      toast.success("Template copied to clipboard");
    }).catch(() => {
      toast.error("Failed to copy template");
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'email':
        return <Mail className="w-4 h-4 text-blue-400" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-blue-500" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-green-400" />;
      default:
        return <Tag className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-[#94A3B8] border-b border-[#3A5380]">
            <th className="pb-3 font-medium">Template</th>
            <th className="pb-3 font-medium">Category</th>
            <th className="pb-3 font-medium">Tags</th>
            <th className="pb-3 font-medium">Last Updated</th>
            <th className="pb-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id} className="border-b border-[#3A5380] hover:bg-[#243B67]/30 transition-colors">
              <td className="py-4">
                <Link to={`/lead-automation-and-icp-configuration/templates/${template.id}`} className="font-medium text-white hover:text-[#2DD4BF] transition-colors">
                  {template.name}
                </Link>
                <p className="text-[#94A3B8] text-sm truncate max-w-[200px]">
                  {template.category === 'email' ? template.subject : template.content.slice(0, 60) + (template.content.length > 60 ? '...' : '')}
                </p>
              </td>
              <td className="py-4">
                <div className="flex items-center">
                  {getCategoryIcon(template.category)}
                  <span className="ml-2 text-white capitalize">{template.category}</span>
                </div>
              </td>
              <td className="py-4">
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                  {template.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-[#243B67] text-[#94A3B8] text-xs px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                  {template.tags.length > 3 && (
                    <span className="bg-[#243B67] text-[#94A3B8] text-xs px-2 py-1 rounded-md">
                      +{template.tags.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td className="py-4 text-[#94A3B8]">
                {formatDistanceToNow(new Date(template.updatedAt), { addSuffix: true })}
              </td>
              <td className="py-4 text-right">
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => handleCopyToClipboard(template)}
                    className="p-1.5 text-[#94A3B8] hover:text-white hover:bg-[#243B67] rounded transition-colors"
                    title="Copy Template"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  
                  <Link
                    to={`/lead-automation-and-icp-configuration/templates/${template.id}/edit`}
                    className="p-1.5 text-[#94A3B8] hover:text-white hover:bg-[#243B67] rounded transition-colors"
                    title="Edit Template"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="p-1.5 text-[#94A3B8] hover:text-red-500 hover:bg-[#243B67] rounded transition-colors"
                    title="Delete Template"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <button
                    className="p-1.5 text-[#94A3B8] hover:text-white hover:bg-[#243B67] rounded transition-colors"
                    title="More Options"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TemplateList;

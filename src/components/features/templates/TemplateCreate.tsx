
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import TemplateForm from "./TemplateForm";

const TemplateCreate: React.FC = () => {
  return (
    <div className="space-y-6 animate-in">
      <div className="mb-6">
        <Link
          to="/lead-automation-and-icp-configuration/templates"
          className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Templates</span>
        </Link>
        <h1 className="text-2xl font-bold text-white">Create New Template</h1>
        <p className="text-[#94A3B8]">Create a reusable message template for your campaigns</p>
      </div>
      
      <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-6">
        <TemplateForm />
      </div>
    </div>
  );
};

export default TemplateCreate;

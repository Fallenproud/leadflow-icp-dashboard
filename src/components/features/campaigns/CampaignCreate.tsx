
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CampaignForm from "./CampaignForm";

const CampaignCreate: React.FC = () => {
  return (
    <div className="space-y-6 animate-in">
      <div className="mb-6">
        <Link
          to="/lead-automation-and-icp-configuration/campaigns"
          className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Campaigns</span>
        </Link>
        <h1 className="text-2xl font-bold text-white">Create New Campaign</h1>
        <p className="text-[#94A3B8]">Set up a new lead generation campaign</p>
      </div>
      
      <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-6">
        <CampaignForm />
      </div>
    </div>
  );
};

export default CampaignCreate;

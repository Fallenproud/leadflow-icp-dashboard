
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getCampaignById } from "@/services/campaignService";
import { CampaignFormData } from "./types";
import CampaignForm from "./CampaignForm";
import { toast } from "sonner";

const CampaignEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<Partial<CampaignFormData>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const fetchCampaign = async () => {
      const campaign = await getCampaignById(id);
      if (!campaign) {
        toast.error("Campaign not found");
        navigate("/lead-automation-and-icp-configuration/campaigns");
        return;
      }
      
      setInitialData({
        name: campaign.name,
        description: campaign.description,
        industries: campaign.target.industries,
        minCompanySize: campaign.target.companySize.min,
        maxCompanySize: campaign.target.companySize.max,
        locations: campaign.target.locations,
        subject: campaign.messaging.subject,
        template: campaign.messaging.template,
        startDate: campaign.schedule.startDate.split('T')[0],
        endDate: campaign.schedule.endDate ? campaign.schedule.endDate.split('T')[0] : null,
        frequency: campaign.schedule.frequency,
      });
      
      setIsLoading(false);
    };
    
    fetchCampaign();
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
          to={`/lead-automation-and-icp-configuration/campaigns/${id}`}
          className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Campaign</span>
        </Link>
        <h1 className="text-2xl font-bold text-white">Edit Campaign</h1>
        <p className="text-[#94A3B8]">Update your campaign settings</p>
      </div>
      
      <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-6">
        <CampaignForm
          initialData={initialData}
          campaignId={id}
          isEditing={true}
        />
      </div>
    </div>
  );
};

export default CampaignEdit;


import React, { useEffect, useState } from "react";
import { BarChart3, Plus, Sliders, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Campaign } from "./types";
import { getCampaigns, initializeCampaignsIfEmpty } from "@/services/campaignService";
import CampaignList from "./CampaignList";
import CampaignStats from "./CampaignStats";

const CampaignDashboard: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize with mock data if empty
    initializeCampaignsIfEmpty();
    
    // Load campaigns from localStorage
    const loadedCampaigns = getCampaigns();
    setCampaigns(loadedCampaigns);
    setIsLoading(false);
  }, []);

  // Calculate campaign statistics
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const totalLeadsGenerated = campaigns.reduce((sum, campaign) => sum + campaign.metrics.sent, 0);
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.metrics.converted, 0);

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Campaign Management</h2>
        <Link
          to="/lead-automation-and-icp-configuration/campaigns/new"
          className="inline-flex items-center justify-center bg-[#2DD4BF] text-[#0A192F] px-4 py-2 rounded-md hover:bg-[#25C4B3] transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span>New Campaign</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2DD4BF]"></div>
        </div>
      ) : (
        <>
          <CampaignStats
            totalCampaigns={totalCampaigns}
            activeCampaigns={activeCampaigns}
            totalLeadsGenerated={totalLeadsGenerated}
            totalConversions={totalConversions}
          />
          
          <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Your Campaigns</h3>
              <div className="flex items-center gap-2">
                <button className="p-2 text-[#94A3B8] hover:text-white hover:bg-[#243B67] rounded-md transition-colors">
                  <Sliders className="w-5 h-5" />
                </button>
                <button className="p-2 text-[#94A3B8] hover:text-white hover:bg-[#243B67] rounded-md transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {campaigns.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 mx-auto text-[#3A5380] mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No campaigns yet</h3>
                <p className="text-[#94A3B8] mb-6">Create your first campaign to start generating leads</p>
                <Link
                  to="/lead-automation-and-icp-configuration/campaigns/new"
                  className="inline-flex items-center justify-center bg-[#2DD4BF] text-[#0A192F] px-4 py-2 rounded-md hover:bg-[#25C4B3] transition-all"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <span>Create Campaign</span>
                </Link>
              </div>
            ) : (
              <CampaignList campaigns={campaigns} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CampaignDashboard;

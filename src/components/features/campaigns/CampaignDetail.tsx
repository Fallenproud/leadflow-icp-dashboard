
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart, Users, Edit, Trash2, Play, Pause, Mail } from "lucide-react";
import { Campaign } from "./types";
import { getCampaignById, deleteCampaign, updateCampaignStatus } from "@/services/campaignService";
import { toast } from "sonner";
import { format } from "date-fns";

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const fetchCampaign = () => {
      const fetchedCampaign = getCampaignById(id);
      if (!fetchedCampaign) {
        toast.error("Campaign not found");
        navigate("/lead-automation-and-icp-configuration/campaigns");
        return;
      }
      
      setCampaign(fetchedCampaign);
      setIsLoading(false);
    };
    
    fetchCampaign();
  }, [id, navigate]);

  const handleDelete = () => {
    if (!campaign) return;
    
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      deleteCampaign(campaign.id);
      toast.success("Campaign deleted");
      navigate("/lead-automation-and-icp-configuration/campaigns");
    }
  };

  const handleStatusChange = (newStatus: 'active' | 'paused') => {
    if (!campaign) return;
    
    updateCampaignStatus(campaign.id, newStatus);
    toast.success(`Campaign ${newStatus === 'active' ? 'activated' : 'paused'}`);
    
    // Update the local state
    setCampaign((prev) => {
      if (!prev) return null;
      return { ...prev, status: newStatus };
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2DD4BF]"></div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-white mb-2">Campaign not found</h3>
        <Link
          to="/lead-automation-and-icp-configuration/campaigns"
          className="text-[#2DD4BF] hover:underline"
        >
          Return to Campaigns
        </Link>
      </div>
    );
  }

  const { name, description, status, target, messaging, schedule, metrics } = campaign;

  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return "text-green-500";
      case 'paused':
        return "text-yellow-500";
      case 'draft':
        return "text-blue-500";
      case 'completed':
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Link
            to="/lead-automation-and-icp-configuration/campaigns"
            className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Campaigns</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">{name}</h1>
          <div className={`mt-1 ${getStatusColor()}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {status === 'active' ? (
            <button
              onClick={() => handleStatusChange('paused')}
              className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
            >
              <Pause className="w-4 h-4 mr-2" />
              <span>Pause Campaign</span>
            </button>
          ) : status !== 'completed' ? (
            <button
              onClick={() => handleStatusChange('active')}
              className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              <Play className="w-4 h-4 mr-2" />
              <span>Activate Campaign</span>
            </button>
          ) : null}
          
          <Link
            to={`/lead-automation-and-icp-configuration/campaigns/${campaign.id}/edit`}
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
        <div className="md:col-span-2">
          <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Overview</h2>
            <p className="text-[#94A3B8] mb-4">{description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{metrics.sent}</div>
                <div className="text-[#94A3B8] text-sm">Leads Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{metrics.opened}</div>
                <div className="text-[#94A3B8] text-sm">Opened</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{metrics.responded}</div>
                <div className="text-[#94A3B8] text-sm">Responded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{metrics.converted}</div>
                <div className="text-[#94A3B8] text-sm">Converted</div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Message Template</h2>
            <div className="p-4 bg-[#243B67] rounded-md">
              <div className="mb-2">
                <span className="text-[#94A3B8] text-sm">Subject:</span> 
                <span className="text-white ml-2">{messaging.subject}</span>
              </div>
              <div className="whitespace-pre-wrap text-white">{messaging.template}</div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Target Criteria</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-[#94A3B8] text-sm">Industries</h3>
                <div className="mt-1">
                  {target.industries.map((industry, index) => (
                    <span key={index} className="inline-block bg-[#243B67] text-white rounded-md px-2 py-1 text-sm mr-2 mb-2">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-[#94A3B8] text-sm">Company Size</h3>
                <div className="text-white mt-1">
                  {target.companySize.min} - {target.companySize.max} employees
                </div>
              </div>
              
              <div>
                <h3 className="text-[#94A3B8] text-sm">Locations</h3>
                <div className="mt-1">
                  {target.locations.map((location, index) => (
                    <span key={index} className="inline-block bg-[#243B67] text-white rounded-md px-2 py-1 text-sm mr-2 mb-2">
                      {location}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Schedule</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-[#94A3B8] text-sm">Frequency</h3>
                <div className="text-white mt-1 capitalize">{schedule.frequency}</div>
              </div>
              
              <div>
                <h3 className="text-[#94A3B8] text-sm">Start Date</h3>
                <div className="text-white mt-1">
                  {format(new Date(schedule.startDate), 'PPP')}
                </div>
              </div>
              
              {schedule.endDate && (
                <div>
                  <h3 className="text-[#94A3B8] text-sm">End Date</h3>
                  <div className="text-white mt-1">
                    {format(new Date(schedule.endDate), 'PPP')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;

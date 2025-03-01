
import React from "react";
import { Campaign } from "./types";
import { Play, Pause, Edit, Trash2, MoreHorizontal, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { updateCampaignStatus, deleteCampaign } from "@/services/campaignService";
import { toast } from "sonner";

interface CampaignListProps {
  campaigns: Campaign[];
}

const CampaignList: React.FC<CampaignListProps> = ({ campaigns }) => {
  const handleStatusChange = (campaign: Campaign, newStatus: 'active' | 'paused') => {
    updateCampaignStatus(campaign.id, newStatus);
    toast.success(`Campaign ${newStatus === 'active' ? 'activated' : 'paused'}`);
    // In a real app, we would update the state or refetch the data
    window.location.reload();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      deleteCampaign(id);
      toast.success("Campaign deleted");
      // In a real app, we would update the state or refetch the data
      window.location.reload();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="flex items-center text-green-500"><CheckCircle className="w-4 h-4 mr-1" /> Active</span>;
      case 'paused':
        return <span className="flex items-center text-yellow-500"><Pause className="w-4 h-4 mr-1" /> Paused</span>;
      case 'draft':
        return <span className="flex items-center text-blue-500"><Clock className="w-4 h-4 mr-1" /> Draft</span>;
      case 'completed':
        return <span className="flex items-center text-gray-500"><CheckCircle className="w-4 h-4 mr-1" /> Completed</span>;
      default:
        return <span className="flex items-center text-gray-500"><AlertCircle className="w-4 h-4 mr-1" /> {status}</span>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-[#94A3B8] border-b border-[#3A5380]">
            <th className="pb-3 font-medium">Campaign</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Leads</th>
            <th className="pb-3 font-medium">Conversions</th>
            <th className="pb-3 font-medium">Last Updated</th>
            <th className="pb-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="border-b border-[#3A5380] hover:bg-[#243B67]/30 transition-colors">
              <td className="py-4">
                <Link to={`/lead-automation-and-icp-configuration/campaigns/${campaign.id}`} className="font-medium text-white hover:text-[#2DD4BF] transition-colors">
                  {campaign.name}
                </Link>
                <p className="text-[#94A3B8] text-sm truncate max-w-[200px]">{campaign.description}</p>
              </td>
              <td className="py-4">{getStatusIcon(campaign.status)}</td>
              <td className="py-4 text-white">{campaign.metrics.sent}</td>
              <td className="py-4 text-white">{campaign.metrics.converted}</td>
              <td className="py-4 text-[#94A3B8]">
                {formatDistanceToNow(new Date(campaign.updatedAt), { addSuffix: true })}
              </td>
              <td className="py-4 text-right">
                <div className="flex items-center justify-end space-x-2">
                  {campaign.status === 'active' ? (
                    <button
                      onClick={() => handleStatusChange(campaign, 'paused')}
                      className="p-1.5 text-yellow-500 hover:bg-[#243B67] rounded transition-colors"
                      title="Pause Campaign"
                    >
                      <Pause className="w-4 h-4" />
                    </button>
                  ) : campaign.status !== 'completed' ? (
                    <button
                      onClick={() => handleStatusChange(campaign, 'active')}
                      className="p-1.5 text-green-500 hover:bg-[#243B67] rounded transition-colors"
                      title="Activate Campaign"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  ) : null}
                  
                  <Link
                    to={`/lead-automation-and-icp-configuration/campaigns/${campaign.id}/edit`}
                    className="p-1.5 text-[#94A3B8] hover:text-white hover:bg-[#243B67] rounded transition-colors"
                    title="Edit Campaign"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  
                  <button
                    onClick={() => handleDelete(campaign.id)}
                    className="p-1.5 text-[#94A3B8] hover:text-red-500 hover:bg-[#243B67] rounded transition-colors"
                    title="Delete Campaign"
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

export default CampaignList;


import React from "react";
import { BarChart3, Zap, Users, BarChart } from "lucide-react";

interface CampaignStatsProps {
  totalCampaigns: number;
  activeCampaigns: number;
  totalLeadsGenerated: number;
  totalConversions: number;
}

const CampaignStats: React.FC<CampaignStatsProps> = ({
  totalCampaigns,
  activeCampaigns,
  totalLeadsGenerated,
  totalConversions,
}) => {
  const stats = [
    {
      label: "Total Campaigns",
      value: totalCampaigns,
      icon: <BarChart3 className="w-5 h-5 text-[#2DD4BF]" />,
      color: "bg-[#243B67]",
    },
    {
      label: "Active Campaigns",
      value: activeCampaigns,
      icon: <Zap className="w-5 h-5 text-[#2DD4BF]" />,
      color: "bg-[#243B67]",
    },
    {
      label: "Leads Generated",
      value: totalLeadsGenerated,
      icon: <Users className="w-5 h-5 text-[#2DD4BF]" />,
      color: "bg-[#243B67]",
    },
    {
      label: "Conversions",
      value: totalConversions,
      icon: <BarChart className="w-5 h-5 text-[#2DD4BF]" />,
      color: "bg-[#243B67]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.color} rounded-lg border border-[#3A5380] p-4 flex flex-col`}
        >
          <div className="flex items-center mb-2">
            <div className="p-2 bg-[#1B2A4A] rounded-md mr-3">
              {stat.icon}
            </div>
            <span className="text-[#94A3B8] text-sm">{stat.label}</span>
          </div>
          <div className="text-2xl font-bold text-white">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default CampaignStats;

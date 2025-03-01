
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardContainer from "@/components/layout/DashboardContainer";
import CampaignDashboard from "@/components/features/campaigns/CampaignDashboard";
import CampaignCreate from "@/components/features/campaigns/CampaignCreate";
import CampaignEdit from "@/components/features/campaigns/CampaignEdit";
import CampaignDetail from "@/components/features/campaigns/CampaignDetail";

const CampaignManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A192F]">
      <div className="container mx-auto px-4 py-8">
        <DashboardContainer>
          <Routes>
            <Route index element={<CampaignDashboard />} />
            <Route path="new" element={<CampaignCreate />} />
            <Route path=":id" element={<CampaignDetail />} />
            <Route path=":id/edit" element={<CampaignEdit />} />
            <Route path="*" element={<Navigate to="/lead-automation-and-icp-configuration/campaigns" replace />} />
          </Routes>
        </DashboardContainer>
      </div>
    </div>
  );
};

export default CampaignManagement;


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardContainer from "@/components/layout/DashboardContainer";
import TemplateDashboard from "@/components/features/templates/TemplateDashboard";
import TemplateCreate from "@/components/features/templates/TemplateCreate";
import TemplateEdit from "@/components/features/templates/TemplateEdit";
import TemplateDetail from "@/components/features/templates/TemplateDetail";

const TemplateManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A192F]">
      <div className="container mx-auto px-4 py-8">
        <DashboardContainer>
          <Routes>
            <Route index element={<TemplateDashboard />} />
            <Route path="new" element={<TemplateCreate />} />
            <Route path=":id" element={<TemplateDetail />} />
            <Route path=":id/edit" element={<TemplateEdit />} />
            <Route path="*" element={<Navigate to="/lead-automation-and-icp-configuration/templates" replace />} />
          </Routes>
        </DashboardContainer>
      </div>
    </div>
  );
};

export default TemplateManagement;

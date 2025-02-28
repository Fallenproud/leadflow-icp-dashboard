
import React from "react";
import { Link } from "react-router-dom";
import DashboardContainer from "@/components/layout/DashboardContainer";
import LeadAutomation from "@/components/features/LeadAutomation";
import ICPConfiguration from "@/components/features/ICPConfiguration";

const Index: React.FC = () => {
  return (
    <DashboardContainer title="Lead Automation & ICP Dashboard">
      <div className="mb-6">
        <Link 
          to="/lead-automation-and-icp-configuration"
          className="inline-flex items-center px-4 py-2 bg-[#243B67] text-white rounded-md hover:bg-[#2D4A80] transition-colors"
        >
          Go to Advanced Configuration
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadAutomation />
        <ICPConfiguration />
      </div>
    </DashboardContainer>
  );
};

export default Index;


import React from "react";
import DashboardContainer from "@/components/layout/DashboardContainer";
import LeadAutomation from "@/components/features/LeadAutomation";
import ICPConfiguration from "@/components/features/ICPConfiguration";

const Index: React.FC = () => {
  return (
    <DashboardContainer title="Lead Automation & ICP Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadAutomation />
        <ICPConfiguration />
      </div>
    </DashboardContainer>
  );
};

export default Index;

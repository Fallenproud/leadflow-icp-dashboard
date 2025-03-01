
"use client";

import React from "react";
import CardContainer from "@/components/layout/CardContainer";
import LeadAutomationForm from "./lead-automation/LeadAutomationForm";

const LeadAutomation: React.FC = () => {
  return (
    <CardContainer 
      title="Lead Automation" 
      subtitle="Configure and start your lead generation automation"
      animationDelay="delay-100"
      imageUrl="https://picsum.photos/id/28/200/200"
      imageAlt="Lead Generation Automation"
    >
      <LeadAutomationForm />
    </CardContainer>
  );
};

export default LeadAutomation;

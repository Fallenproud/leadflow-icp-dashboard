
"use client";

import React from "react";
import CardContainer from "@/components/layout/CardContainer";
import ICPForm from "./icp/ICPForm";
import { useICPFormLogic } from "./icp/ICPFormLogic";

const ICPConfiguration: React.FC = () => {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } = useICPFormLogic();

  return (
    <CardContainer 
      title="ICP Configuration" 
      subtitle="Define your Ideal Customer Profile for targeted lead generation"
      animationDelay="delay-200"
      imageUrl="https://picsum.photos/id/180/200/200"
      imageAlt="ICP Configuration"
    >
      <ICPForm
        formData={formData}
        errors={errors}
        isSubmitting={isSubmitting}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </CardContainer>
  );
};

export default ICPConfiguration;

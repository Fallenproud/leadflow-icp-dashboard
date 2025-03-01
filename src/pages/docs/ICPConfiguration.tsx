
import React from "react";
import { FileText, ArrowLeft } from "lucide-react";
import DashboardContainer from "@/components/layout/DashboardContainer";
import { Link } from "react-router-dom";

const ICPConfiguration: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A192F]">
      <div className="container mx-auto px-4 py-8">
        <Link to="/documentation" className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Documentation</span>
        </Link>

        <DashboardContainer title="ICP Configuration">
          <div className="bg-[#1B2A4A] border border-[#3A5380] rounded-lg p-6 mb-8 animate-fade-in">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-[#243B67] rounded-full flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-[#2DD4BF]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Define Your Ideal Customer Profile</h3>
                <p className="text-[#94A3B8] mt-2">Learn how to configure your ICP for maximum targeting efficiency</p>
              </div>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-[#94A3B8] mb-4">
                Your Ideal Customer Profile (ICP) is a detailed description of the companies that would get the most value from your product or service. 
                Defining your ICP accurately helps you focus your sales and marketing efforts on prospects that are most likely to convert.
              </p>
              
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">Industry Selection</h4>
              <p className="text-[#94A3B8] mb-4">
                Our platform provides comprehensive industry categorization using standard industry codes. You can:
              </p>
              <ul className="space-y-2 text-[#94A3B8] list-disc pl-5">
                <li>Select multiple industries and sub-industries</li>
                <li>Set priority levels for different sectors</li>
                <li>Exclude specific industry segments</li>
                <li>Use our AI-powered industry recommendations based on your current customer base</li>
              </ul>
              
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">Company Size Targeting</h4>
              <p className="text-[#94A3B8] mb-4">
                Define your target company size using various metrics:
              </p>
              <ul className="space-y-2 text-[#94A3B8] list-disc pl-5">
                <li>Employee count ranges (e.g., 50-200, 201-500)</li>
                <li>Department size specifications</li>
                <li>Growth rate indicators</li>
                <li>Company age and maturity</li>
              </ul>
              
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">Revenue Thresholds</h4>
              <p className="text-[#94A3B8] mb-4">
                Set revenue parameters to target companies with appropriate budgets:
              </p>
              <ul className="space-y-2 text-[#94A3B8] list-disc pl-5">
                <li>Annual revenue brackets</li>
                <li>Departmental budget estimates</li>
                <li>Funding stage for startups</li>
                <li>Profitability indicators</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-[#243B67] rounded-lg border border-[#3A5380] animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4">Ready to configure your ICP?</h3>
            <p className="text-[#94A3B8] mb-6">Use our intuitive interface to set up your ideal customer profile and start targeting the right prospects.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/lead-automation-and-icp-configuration" className="flex items-center justify-center p-3 bg-[#2DD4BF] text-[#0A192F] rounded-md hover:bg-[#25C4B3] transition-colors font-medium">
                <span>Go to ICP Configuration</span>
              </Link>
              <button className="flex items-center justify-center p-3 bg-transparent text-white border border-[#3A5380] rounded-md hover:bg-[#1B2A4A] transition-colors font-medium">
                <span>Schedule a Demo</span>
              </button>
            </div>
          </div>
        </DashboardContainer>
      </div>
    </div>
  );
};

export default ICPConfiguration;

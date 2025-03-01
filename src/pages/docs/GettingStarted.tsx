
import React from "react";
import { BookOpen, ArrowLeft } from "lucide-react";
import DashboardContainer from "@/components/layout/DashboardContainer";
import { Link } from "react-router-dom";

const GettingStarted: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A192F]">
      <div className="container mx-auto px-4 py-8">
        <Link to="/documentation" className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Documentation</span>
        </Link>

        <DashboardContainer title="Getting Started">
          <div className="bg-[#1B2A4A] border border-[#3A5380] rounded-lg p-6 mb-8 animate-fade-in">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-[#243B67] rounded-full flex items-center justify-center mr-4">
                <BookOpen className="w-6 h-6 text-[#2DD4BF]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Platform Overview</h3>
                <p className="text-[#94A3B8] mt-2">Learn the basics of our lead generation and ICP configuration platform</p>
              </div>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-[#94A3B8] mb-4">
                Our platform provides a comprehensive solution for businesses looking to optimize their lead generation process and define their Ideal Customer Profile (ICP).
                With powerful automation tools and detailed configuration options, you can target the right prospects and increase your conversion rates.
              </p>
              
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">Key Features</h4>
              <ul className="space-y-2 text-[#94A3B8] list-disc pl-5">
                <li>Advanced ICP configuration with multiple targeting parameters</li>
                <li>Automated lead generation campaigns</li>
                <li>Integration with popular CRM platforms</li>
                <li>Detailed analytics and reporting</li>
                <li>API access for custom implementations</li>
              </ul>
              
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">Initial Setup</h4>
              <p className="text-[#94A3B8] mb-4">
                Setting up your account is simple. After registration, you'll be guided through the following steps:
              </p>
              <ol className="space-y-2 text-[#94A3B8] list-decimal pl-5">
                <li>Define your ICP parameters</li>
                <li>Configure your lead automation settings</li>
                <li>Set up integrations with your existing tools</li>
                <li>Launch your first campaign</li>
              </ol>
              
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">Best Practices</h4>
              <p className="text-[#94A3B8] mb-4">
                For optimal results, we recommend:
              </p>
              <ul className="space-y-2 text-[#94A3B8] list-disc pl-5">
                <li>Start with a narrow ICP definition and expand gradually</li>
                <li>Test multiple campaign approaches before scaling</li>
                <li>Regularly review and refine your targeting parameters</li>
                <li>Use A/B testing for campaign messaging</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-[#243B67] rounded-lg border border-[#3A5380] animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4">Ready to get started?</h3>
            <p className="text-[#94A3B8] mb-6">Follow our step-by-step guide or get personalized assistance from our support team.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/lead-automation-and-icp-configuration" className="flex items-center justify-center p-3 bg-[#2DD4BF] text-[#0A192F] rounded-md hover:bg-[#25C4B3] transition-colors font-medium">
                <span>Go to Configuration</span>
              </Link>
              <button className="flex items-center justify-center p-3 bg-transparent text-white border border-[#3A5380] rounded-md hover:bg-[#1B2A4A] transition-colors font-medium">
                <span>Contact Support</span>
              </button>
            </div>
          </div>
        </DashboardContainer>
      </div>
    </div>
  );
};

export default GettingStarted;

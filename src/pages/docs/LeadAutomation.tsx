
import React from "react";
import { HelpCircle, ArrowLeft } from "lucide-react";
import DashboardContainer from "@/components/layout/DashboardContainer";
import { Link } from "react-router-dom";

const LeadAutomation: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A192F]">
      <div className="container mx-auto px-4 py-8">
        <Link to="/documentation" className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Documentation</span>
        </Link>

        <DashboardContainer title="Lead Automation">
          <div className="bg-[#1B2A4A] border border-[#3A5380] rounded-lg p-6 mb-8 animate-fade-in">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-[#243B67] rounded-full flex items-center justify-center mr-4">
                <HelpCircle className="w-6 h-6 text-[#2DD4BF]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Set Up and Optimize Lead Generation</h3>
                <p className="text-[#94A3B8] mt-2">Learn how to automate your lead generation process for maximum efficiency</p>
              </div>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-[#94A3B8] mb-4">
                Our lead automation system helps you find, qualify, and engage with prospects that match your ICP criteria. 
                By automating repetitive tasks, you can focus on building relationships with high-quality leads.
              </p>
              
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">Campaign Setup</h4>
              <p className="text-[#94A3B8] mb-4">
                Configure automated lead generation campaigns with these steps:
              </p>
              <ol className="space-y-2 text-[#94A3B8] list-decimal pl-5">
                <li>Select target audience based on your ICP</li>
                <li>Define outreach channels (email, social, etc.)</li>
                <li>Create message templates and sequences</li>
                <li>Set campaign schedule and frequency</li>
                <li>Configure follow-up rules and triggers</li>
              </ol>
              
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">Lead Scoring</h4>
              <p className="text-[#94A3B8] mb-4">
                Our platform uses a sophisticated lead scoring system to prioritize prospects:
              </p>
              <ul className="space-y-2 text-[#94A3B8] list-disc pl-5">
                <li>Demographic fit score based on ICP match</li>
                <li>Engagement score based on interactions</li>
                <li>Intent signals from various sources</li>
                <li>Customizable scoring rules for your business</li>
              </ul>
              
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">Automation Workflows</h4>
              <p className="text-[#94A3B8] mb-4">
                Create intelligent workflows that respond to prospect behavior:
              </p>
              <ul className="space-y-2 text-[#94A3B8] list-disc pl-5">
                <li>Trigger-based email sequences</li>
                <li>Multi-channel follow-up processes</li>
                <li>Lead routing to appropriate team members</li>
                <li>CRM integration for seamless data flow</li>
                <li>Meeting scheduling automation</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-[#243B67] rounded-lg border border-[#3A5380] animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4">Ready to automate your lead generation?</h3>
            <p className="text-[#94A3B8] mb-6">Set up your first campaign and start generating qualified leads that match your ICP.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/lead-automation-and-icp-configuration" className="flex items-center justify-center p-3 bg-[#2DD4BF] text-[#0A192F] rounded-md hover:bg-[#25C4B3] transition-colors font-medium">
                <span>Go to Lead Automation</span>
              </Link>
              <button className="flex items-center justify-center p-3 bg-transparent text-white border border-[#3A5380] rounded-md hover:bg-[#1B2A4A] transition-colors font-medium">
                <span>View Demo Video</span>
              </button>
            </div>
          </div>
        </DashboardContainer>
      </div>
    </div>
  );
};

export default LeadAutomation;

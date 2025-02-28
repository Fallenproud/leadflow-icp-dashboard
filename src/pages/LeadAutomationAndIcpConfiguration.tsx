
import React from "react";
import { Sliders, BarChart3, ExternalLink, Save } from "lucide-react";
import DashboardContainer from "@/components/layout/DashboardContainer";
import LeadAutomation from "@/components/features/LeadAutomation";
import ICPConfiguration from "@/components/features/ICPConfiguration";

const LeadAutomationAndIcpConfiguration: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0A192F]">
      {/* Sidebar - 30% on desktop */}
      <aside className="w-full lg:w-[30%] bg-[#1B2A4A] p-4 lg:p-6 border-r border-[#3A5380]">
        <div className="sticky top-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Configuration</h2>
            
            <nav className="space-y-2">
              <a href="#icp-config" className="flex items-center p-3 rounded-md bg-[#243B67] text-white hover:bg-[#2D4A80] transition-colors">
                <Sliders className="w-5 h-5 mr-3 text-[#2DD4BF]" />
                <span>ICP Configuration</span>
              </a>
              
              <a href="#lead-automation" className="flex items-center p-3 rounded-md bg-transparent text-white hover:bg-[#243B67] transition-colors">
                <BarChart3 className="w-5 h-5 mr-3 text-[#94A3B8]" />
                <span>Lead Automation</span>
              </a>
            </nav>
          </div>
          
          <div className="mt-8">
            <h3 className="text-sm uppercase text-[#94A3B8] font-medium mb-3">Quick Actions</h3>
            
            <div className="space-y-2">
              <a href="#" className="flex items-center p-3 rounded-md text-white hover:bg-[#243B67] transition-colors">
                <ExternalLink className="w-5 h-5 mr-3 text-[#94A3B8]" />
                <span>Documentation</span>
              </a>
            </div>
          </div>
          
          <div className="mt-auto pt-8">
            <button className="w-full flex items-center justify-center p-3 bg-[#2DD4BF] text-[#0A192F] rounded-md hover:bg-[#25C4B3] transition-colors font-medium">
              <Save className="w-5 h-5 mr-2" />
              <span>Save Configuration</span>
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main content - 70% on desktop */}
      <main className="w-full lg:w-[70%] p-4 lg:p-6">
        <DashboardContainer title="Lead Automation & ICP Dashboard">
          <div className="mb-6">
            <div className="flex items-center text-sm text-[#94A3B8]">
              <a href="/" className="hover:text-white transition-colors">Dashboard</a>
              <span className="mx-2">/</span>
              <span className="text-white">Configuration</span>
            </div>
          </div>
          
          <div className="space-y-8">
            <section id="icp-config">
              <ICPConfiguration />
            </section>
            
            <section id="lead-automation">
              <LeadAutomation />
            </section>
          </div>
          
          {/* Mobile save button */}
          <div className="fixed bottom-6 right-6 lg:hidden">
            <button className="flex items-center justify-center p-3 bg-[#2DD4BF] text-[#0A192F] rounded-full shadow-lg hover:bg-[#25C4B3] transition-colors">
              <Save className="w-6 h-6" />
            </button>
          </div>
        </DashboardContainer>
      </main>
    </div>
  );
};

export default LeadAutomationAndIcpConfiguration;

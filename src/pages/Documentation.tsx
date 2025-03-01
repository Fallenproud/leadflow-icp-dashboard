
"use client";

import React from "react";
import { BookOpen, FileText, ArrowLeft, Search, HelpCircle, Info } from "lucide-react";
import DashboardContainer from "@/components/layout/DashboardContainer";
import { Link } from "react-router-dom";

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A192F]">
      <div className="container mx-auto px-4 py-8">
        <Link to="/lead-automation-and-icp-configuration" className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Configuration</span>
        </Link>

        <DashboardContainer title="Documentation">
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-10 pr-4 py-3 bg-[#1B2A4A] border border-[#3A5380] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/docs/getting-started" className="bg-[#1B2A4A] border border-[#3A5380] rounded-lg p-6 hover:shadow-lg transition-shadow animate-fade-in hover:border-[#2DD4BF]">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-[#243B67] rounded-full flex items-center justify-center mr-4">
                  <BookOpen className="w-6 h-6 text-[#2DD4BF]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Getting Started</h3>
                  <p className="text-[#94A3B8] mt-1">Learn the basics and set up your first configuration</p>
                </div>
              </div>
              <ul className="space-y-3 text-white">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#2DD4BF] rounded-full mr-2"></span>
                  <span className="hover:text-[#2DD4BF] transition-colors">Platform overview</span>
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#2DD4BF] rounded-full mr-2"></span>
                  <span className="hover:text-[#2DD4BF] transition-colors">Initial configuration</span>
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#2DD4BF] rounded-full mr-2"></span>
                  <span className="hover:text-[#2DD4BF] transition-colors">Best practices</span>
                </li>
              </ul>
            </Link>

            <Link to="/docs/icp-configuration" className="bg-[#1B2A4A] border border-[#3A5380] rounded-lg p-6 hover:shadow-lg transition-shadow animate-fade-in hover:border-[#2DD4BF]" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-[#243B67] rounded-full flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-[#2DD4BF]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">ICP Configuration</h3>
                  <p className="text-[#94A3B8] mt-1">Define your Ideal Customer Profile</p>
                </div>
              </div>
              <ul className="space-y-3 text-white">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#2DD4BF] rounded-full mr-2"></span>
                  <span className="hover:text-[#2DD4BF] transition-colors">Industry selection</span>
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#2DD4BF] rounded-full mr-2"></span>
                  <span className="hover:text-[#2DD4BF] transition-colors">Company size targeting</span>
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#2DD4BF] rounded-full mr-2"></span>
                  <span className="hover:text-[#2DD4BF] transition-colors">Revenue thresholds</span>
                </li>
              </ul>
            </Link>

            <Link to="/docs/lead-automation" className="bg-[#1B2A4A] border border-[#3A5380] rounded-lg p-6 hover:shadow-lg transition-shadow animate-fade-in hover:border-[#2DD4BF]" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-[#243B67] rounded-full flex items-center justify-center mr-4">
                  <HelpCircle className="w-6 h-6 text-[#2DD4BF]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Lead Automation</h3>
                  <p className="text-[#94A3B8] mt-1">Set up and optimize lead generation</p>
                </div>
              </div>
              <ul className="space-y-3 text-white">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#2DD4BF] rounded-full mr-2"></span>
                  <span className="hover:text-[#2DD4BF] transition-colors">Campaign setup</span>
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#2DD4BF] rounded-full mr-2"></span>
                  <span className="hover:text-[#2DD4BF] transition-colors">Lead scoring</span>
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#2DD4BF] rounded-full mr-2"></span>
                  <span className="hover:text-[#2DD4BF] transition-colors">Automation workflows</span>
                </li>
              </ul>
            </Link>

            <Link to="/docs/api-reference" className="bg-[#1B2A4A] border border-[#3A5380] rounded-lg p-6 hover:shadow-lg transition-shadow animate-fade-in hover:border-[#2DD4BF]" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-[#243B67] rounded-full flex items-center justify-center mr-4">
                  <Info className="w-6 h-6 text-[#2DD4BF]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">API Reference</h3>
                  <p className="text-[#94A3B8] mt-1">Technical documentation and integration guides</p>
                </div>
              </div>
              <ul className="space-y-3 text-white">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#2DD4BF] rounded-full mr-2"></span>
                  <span className="hover:text-[#2DD4BF] transition-colors">REST API endpoints</span>
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#2DD4BF] rounded-full mr-2"></span>
                  <span className="hover:text-[#2DD4BF] transition-colors">Authentication</span>
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#2DD4BF] rounded-full mr-2"></span>
                  <span className="hover:text-[#2DD4BF] transition-colors">Webhooks</span>
                </li>
              </ul>
            </Link>
          </div>

          <div className="mt-10 p-6 bg-[#243B67] rounded-lg border border-[#3A5380] animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-xl font-bold text-white mb-4">Need additional help?</h3>
            <p className="text-[#94A3B8] mb-6">Our support team is available to answer your questions and provide assistance with your configuration.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center p-3 bg-[#2DD4BF] text-[#0A192F] rounded-md hover:bg-[#25C4B3] transition-colors font-medium">
                <span>Contact Support</span>
              </button>
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

export default Documentation;

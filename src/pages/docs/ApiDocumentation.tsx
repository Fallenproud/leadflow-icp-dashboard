
import React from "react";
import { ArrowLeft, Code, Api } from "lucide-react";
import DashboardContainer from "@/components/layout/DashboardContainer";
import { Link } from "react-router-dom";

const ApiDocumentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A192F]">
      <div className="container mx-auto px-4 py-8">
        <Link to="/docs/api-reference" className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to API Reference</span>
        </Link>

        <DashboardContainer title="API Documentation">
          <div className="bg-[#1B2A4A] border border-[#3A5380] rounded-lg p-6 mb-8 animate-fade-in">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-[#243B67] rounded-full flex items-center justify-center mr-4">
                <Code className="w-6 h-6 text-[#2DD4BF]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Complete API Documentation</h3>
                <p className="text-[#94A3B8] mt-2">Detailed reference for all API endpoints and operations</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">API Overview</h4>
              <p className="text-[#94A3B8] mb-4">
                Our REST API is designed to give developers complete programmatic access to all platform features. 
                This documentation provides detailed information on all endpoints, request/response formats, 
                authentication methods, and error handling.
              </p>
              
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">Authentication</h4>
              <p className="text-[#94A3B8] mb-4">
                All API requests require authentication using bearer tokens. You can generate API keys from your 
                account dashboard under API Settings.
              </p>
              
              <div className="bg-[#243B67] rounded p-4 mb-6 overflow-x-auto">
                <h5 className="text-[#2DD4BF] text-sm font-mono mb-2">Authentication Header</h5>
                <pre className="text-white text-sm overflow-x-auto font-mono">
                  Authorization: Bearer YOUR_API_KEY
                </pre>
              </div>
              
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">Core Endpoints</h4>
              
              <div className="space-y-4">
                <div className="bg-[#243B67] rounded p-4 overflow-x-auto">
                  <h5 className="text-[#2DD4BF] text-sm font-mono mb-2">Leads API</h5>
                  <p className="text-[#94A3B8] text-sm mb-2">Manage and query lead data</p>
                  <ul className="list-disc pl-5 text-[#94A3B8] text-sm space-y-1">
                    <li>GET /api/v1/leads - List leads</li>
                    <li>GET /api/v1/leads/:id - Get lead details</li>
                    <li>POST /api/v1/leads - Create a new lead</li>
                    <li>PUT /api/v1/leads/:id - Update lead information</li>
                    <li>DELETE /api/v1/leads/:id - Delete a lead</li>
                  </ul>
                </div>
                
                <div className="bg-[#243B67] rounded p-4 overflow-x-auto">
                  <h5 className="text-[#2DD4BF] text-sm font-mono mb-2">Campaigns API</h5>
                  <p className="text-[#94A3B8] text-sm mb-2">Configure and run lead campaigns</p>
                  <ul className="list-disc pl-5 text-[#94A3B8] text-sm space-y-1">
                    <li>GET /api/v1/campaigns - List campaigns</li>
                    <li>GET /api/v1/campaigns/:id - Get campaign details</li>
                    <li>POST /api/v1/campaigns - Create a new campaign</li>
                    <li>PUT /api/v1/campaigns/:id - Update campaign</li>
                    <li>DELETE /api/v1/campaigns/:id - Delete a campaign</li>
                    <li>POST /api/v1/campaigns/:id/start - Start a campaign</li>
                    <li>POST /api/v1/campaigns/:id/pause - Pause a campaign</li>
                  </ul>
                </div>
                
                <div className="bg-[#243B67] rounded p-4 overflow-x-auto">
                  <h5 className="text-[#2DD4BF] text-sm font-mono mb-2">ICP API</h5>
                  <p className="text-[#94A3B8] text-sm mb-2">Manage Ideal Customer Profile configurations</p>
                  <ul className="list-disc pl-5 text-[#94A3B8] text-sm space-y-1">
                    <li>GET /api/v1/icp - Get ICP configurations</li>
                    <li>PUT /api/v1/icp - Update ICP configuration</li>
                    <li>POST /api/v1/icp/analyze - Analyze data against ICP</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">Rate Limits</h4>
              <p className="text-[#94A3B8] mb-4">
                API requests are subject to rate limiting to ensure platform stability. Rate limits vary 
                by account tier:
              </p>
              <ul className="space-y-2 text-[#94A3B8] list-disc pl-5">
                <li>Free tier: 100 requests per hour</li>
                <li>Professional tier: 1,000 requests per hour</li>
                <li>Enterprise tier: 10,000 requests per hour</li>
              </ul>
              <p className="text-[#94A3B8] mt-2">
                Rate limit headers are included in all API responses to help you track your usage.
              </p>
              
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">SDKs and Libraries</h4>
              <p className="text-[#94A3B8] mb-4">
                We provide official client libraries for popular programming languages:
              </p>
              <ul className="space-y-2 text-[#94A3B8] list-disc pl-5">
                <li>JavaScript/TypeScript (Node.js and browser)</li>
                <li>Python</li>
                <li>Ruby</li>
                <li>PHP</li>
                <li>Java</li>
                <li>Go</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-[#243B67] rounded-lg border border-[#3A5380] animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4">Need further assistance?</h3>
            <p className="text-[#94A3B8] mb-6">Our developer support team is available to help with any API integration questions.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/docs/developer-support" className="flex items-center justify-center p-3 bg-transparent text-white border border-[#3A5380] rounded-md hover:bg-[#1B2A4A] transition-colors font-medium">
                <span>Contact Developer Support</span>
              </Link>
            </div>
          </div>
        </DashboardContainer>
      </div>
    </div>
  );
};

export default ApiDocumentation;

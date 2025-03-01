
import React from "react";
import { Info, ArrowLeft, Code } from "lucide-react";
import DashboardContainer from "@/components/layout/DashboardContainer";
import { Link } from "react-router-dom";

const ApiReference: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A192F]">
      <div className="container mx-auto px-4 py-8">
        <Link to="/documentation" className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Documentation</span>
        </Link>

        <DashboardContainer title="API Reference">
          <div className="bg-[#1B2A4A] border border-[#3A5380] rounded-lg p-6 mb-8 animate-fade-in">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-[#243B67] rounded-full flex items-center justify-center mr-4">
                <Info className="w-6 h-6 text-[#2DD4BF]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Technical Documentation</h3>
                <p className="text-[#94A3B8] mt-2">Complete API reference for developers</p>
              </div>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-[#94A3B8] mb-4">
                Our RESTful API provides programmatic access to all platform features. You can integrate our lead generation and ICP configuration capabilities into your applications or workflows.
              </p>
              
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">REST API Endpoints</h4>
              <p className="text-[#94A3B8] mb-4">
                Our API is organized around REST principles. All endpoints accept JSON-encoded request bodies and return JSON-encoded responses.
              </p>
              
              <div className="bg-[#243B67] rounded p-4 mb-6 overflow-x-auto">
                <h5 className="text-[#2DD4BF] text-sm font-mono mb-2">GET /api/v1/leads</h5>
                <p className="text-[#94A3B8] text-sm">Retrieve leads based on query parameters</p>
                <div className="mt-2">
                  <pre className="text-white text-sm overflow-x-auto font-mono">
{`// Example response
{
  "leads": [
    {
      "id": "lead_123",
      "name": "John Doe",
      "company": "Acme Inc",
      "score": 85,
      "created_at": "2023-06-15T10:30:00Z"
    },
    ...
  ],
  "total": 150,
  "page": 1,
  "per_page": 25
}`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-[#243B67] rounded p-4 mb-6 overflow-x-auto">
                <h5 className="text-[#2DD4BF] text-sm font-mono mb-2">POST /api/v1/campaigns</h5>
                <p className="text-[#94A3B8] text-sm">Create a new lead generation campaign</p>
                <div className="mt-2">
                  <pre className="text-white text-sm overflow-x-auto font-mono">
{`// Example request
{
  "name": "Q2 Enterprise Outreach",
  "target_industries": ["software", "healthcare"],
  "company_size": {
    "min_employees": 500,
    "max_employees": 5000
  },
  "message_template_id": "tmpl_456"
}`}
                  </pre>
                </div>
              </div>
              
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">Authentication</h4>
              <p className="text-[#94A3B8] mb-4">
                All API requests require authentication using API keys. To obtain an API key:
              </p>
              <ol className="space-y-2 text-[#94A3B8] list-decimal pl-5">
                <li>Navigate to your account settings</li>
                <li>Select the "API Keys" tab</li>
                <li>Click "Generate New Key"</li>
                <li>Set permissions and expiration if needed</li>
              </ol>
              <div className="bg-[#243B67] rounded p-4 mt-4 mb-6">
                <p className="text-[#94A3B8] text-sm">Include your API key in the Authorization header:</p>
                <pre className="text-white text-sm overflow-x-auto font-mono mt-2">
                  Authorization: Bearer YOUR_API_KEY
                </pre>
              </div>
              
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">Webhooks</h4>
              <p className="text-[#94A3B8] mb-4">
                Use webhooks to receive real-time notifications when specific events occur in your account:
              </p>
              <ul className="space-y-2 text-[#94A3B8] list-disc pl-5">
                <li>New lead identified</li>
                <li>Lead score changed</li>
                <li>Campaign milestone reached</li>
                <li>Integration status updates</li>
              </ul>
              <div className="bg-[#243B67] rounded p-4 mt-4">
                <p className="text-[#94A3B8] text-sm">Configure webhook endpoints in your dashboard settings</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-[#243B67] rounded-lg border border-[#3A5380] animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4">Need technical assistance?</h3>
            <p className="text-[#94A3B8] mb-6">Our developer support team is available to help with API integration questions.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/docs/api-documentation" className="flex items-center justify-center p-3 bg-[#2DD4BF] text-[#0A192F] rounded-md hover:bg-[#25C4B3] transition-colors font-medium">
                <Code className="w-4 h-4 mr-2" />
                <span>View API Documentation</span>
              </Link>
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

export default ApiReference;


import React from "react";
import { ArrowLeft, Code, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardContainer from "@/components/layout/DashboardContainer";

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
                <FileText className="w-6 h-6 text-[#2DD4BF]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Comprehensive API Documentation</h3>
                <p className="text-[#94A3B8] mt-2">Detailed guides and examples for our API endpoints</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="mb-8">
                <h4 className="text-white text-lg font-semibold mb-3">Getting Started with the API</h4>
                <p className="text-[#94A3B8] mb-4">
                  Our API provides programmatic access to all platform features. Before you begin integration, 
                  you'll need to generate an API key from your dashboard.
                </p>
                <Link 
                  to="/api-key-management" 
                  className="inline-flex items-center bg-[#243B67] text-white px-4 py-2 rounded hover:bg-[#3A5380] transition-colors"
                >
                  <span>Manage API Keys</span>
                </Link>
              </div>

              <div className="mb-8">
                <h4 className="text-white text-lg font-semibold mb-3">Authentication</h4>
                <p className="text-[#94A3B8] mb-4">
                  All API requests require authentication via API keys. Include your API key in the Authorization header:
                </p>
                <div className="bg-[#243B67] rounded p-4 overflow-x-auto">
                  <pre className="text-white text-sm font-mono">
{`// Example request with API key authentication
const response = await fetch('https://api.example.com/v1/leads', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});`}
                  </pre>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-white text-lg font-semibold mb-3">Endpoints</h4>
                <p className="text-[#94A3B8] mb-4">
                  Our API is organized around REST principles. Below are the main endpoints:
                </p>

                <div className="space-y-4">
                  <div className="bg-[#243B67] rounded p-4">
                    <h5 className="text-[#2DD4BF] font-mono mb-2">GET /api/v1/leads</h5>
                    <p className="text-[#94A3B8] mb-2">Retrieve leads based on query parameters</p>
                    <p className="text-[#94A3B8] text-sm">
                      Query parameters:
                    </p>
                    <ul className="list-disc pl-5 text-[#94A3B8] text-sm mb-2">
                      <li><span className="font-mono">page</span>: Page number (default: 1)</li>
                      <li><span className="font-mono">per_page</span>: Items per page (default: 25, max: 100)</li>
                      <li><span className="font-mono">sort</span>: Sort field (e.g., created_at, score)</li>
                      <li><span className="font-mono">direction</span>: Sort direction (asc, desc)</li>
                    </ul>
                  </div>

                  <div className="bg-[#243B67] rounded p-4">
                    <h5 className="text-[#2DD4BF] font-mono mb-2">POST /api/v1/campaigns</h5>
                    <p className="text-[#94A3B8] mb-2">Create a new lead generation campaign</p>
                    <p className="text-[#94A3B8] text-sm mb-2">
                      Required fields:
                    </p>
                    <ul className="list-disc pl-5 text-[#94A3B8] text-sm">
                      <li><span className="font-mono">name</span>: Campaign name</li>
                      <li><span className="font-mono">target_industries</span>: Array of target industries</li>
                      <li><span className="font-mono">message_template_id</span>: Template ID for campaign messages</li>
                    </ul>
                  </div>

                  <div className="bg-[#243B67] rounded p-4">
                    <h5 className="text-[#2DD4BF] font-mono mb-2">GET /api/v1/metrics</h5>
                    <p className="text-[#94A3B8] mb-2">Retrieve campaign performance metrics</p>
                    <p className="text-[#94A3B8] text-sm">
                      Query parameters:
                    </p>
                    <ul className="list-disc pl-5 text-[#94A3B8] text-sm">
                      <li><span className="font-mono">campaign_id</span>: ID of the campaign (optional)</li>
                      <li><span className="font-mono">timeframe</span>: Timeframe for metrics (day, week, month, year)</li>
                      <li><span className="font-mono">start_date</span>: Start date for custom timeframe</li>
                      <li><span className="font-mono">end_date</span>: End date for custom timeframe</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-white text-lg font-semibold mb-3">Rate Limiting</h4>
                <p className="text-[#94A3B8] mb-4">
                  The API is rate limited to prevent abuse. Default limits:
                </p>
                <ul className="list-disc pl-5 text-[#94A3B8]">
                  <li>100 requests per minute for standard accounts</li>
                  <li>1000 requests per minute for enterprise accounts</li>
                </ul>
                <p className="text-[#94A3B8] mt-4">
                  Rate limit information is included in response headers:
                </p>
                <div className="bg-[#243B67] rounded p-4 mt-2">
                  <pre className="text-white text-sm font-mono">
{`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1619723450`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-[#243B67] rounded-lg border border-[#3A5380] animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
            <p className="text-[#94A3B8] mb-6">
              Explore our API integration examples in different programming languages:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1B2A4A] p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Code className="w-5 h-5 text-[#2DD4BF] mr-2" />
                  <h4 className="text-white font-medium">JavaScript/Node.js</h4>
                </div>
                <pre className="bg-[#0A192F] p-3 rounded overflow-x-auto text-sm text-[#94A3B8] font-mono">
{`// Using fetch API
async function getLeads() {
  const response = await fetch(
    'https://api.example.com/v1/leads', 
    {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    }
  );
  
  const data = await response.json();
  return data;
}`}
                </pre>
              </div>
              
              <div className="bg-[#1B2A4A] p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Code className="w-5 h-5 text-[#2DD4BF] mr-2" />
                  <h4 className="text-white font-medium">Python</h4>
                </div>
                <pre className="bg-[#0A192F] p-3 rounded overflow-x-auto text-sm text-[#94A3B8] font-mono">
{`# Using requests library
import requests

def get_leads():
    headers = {
        'Authorization': 'Bearer YOUR_API_KEY'
    }
    
    response = requests.get(
        'https://api.example.com/v1/leads',
        headers=headers
    )
    
    return response.json()`}
                </pre>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link to="/api-key-management" className="flex items-center justify-center p-3 bg-[#2DD4BF] text-[#0A192F] rounded-md hover:bg-[#25C4B3] transition-colors font-medium">
                <span>Manage Your API Keys</span>
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

export default ApiDocumentation;

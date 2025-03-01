
import React from "react";
import { ArrowLeft, MessageSquare, Mail, Phone } from "lucide-react";
import DashboardContainer from "@/components/layout/DashboardContainer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DeveloperSupport: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A192F]">
      <div className="container mx-auto px-4 py-8">
        <Link to="/docs/api-reference" className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to API Reference</span>
        </Link>

        <DashboardContainer title="Developer Support">
          <div className="bg-[#1B2A4A] border border-[#3A5380] rounded-lg p-6 mb-8 animate-fade-in">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-[#243B67] rounded-full flex items-center justify-center mr-4">
                <MessageSquare className="w-6 h-6 text-[#2DD4BF]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Developer Support Center</h3>
                <p className="text-[#94A3B8] mt-2">Get expert help with API integration and technical questions</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-[#94A3B8] mb-4">
                Our dedicated developer support team is available to assist you with any technical questions related to our 
                API integration, implementation challenges, or platform features.
              </p>
              
              <h4 className="text-white text-lg font-semibold mt-6 mb-3">Support Channels</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-[#243B67] rounded-lg p-5 border border-[#3A5380]">
                  <div className="flex items-center mb-4">
                    <Mail className="w-5 h-5 text-[#2DD4BF] mr-3" />
                    <h5 className="text-white font-medium">Email Support</h5>
                  </div>
                  <p className="text-[#94A3B8] mb-4 text-sm">
                    Send us a detailed description of your issue and receive a response within 24 hours.
                  </p>
                  <p className="text-white font-mono text-sm">api-support@example.com</p>
                </div>
                
                <div className="bg-[#243B67] rounded-lg p-5 border border-[#3A5380]">
                  <div className="flex items-center mb-4">
                    <MessageSquare className="w-5 h-5 text-[#2DD4BF] mr-3" />
                    <h5 className="text-white font-medium">Developer Chat</h5>
                  </div>
                  <p className="text-[#94A3B8] mb-4 text-sm">
                    Chat with our developer support team in real-time during business hours.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Start Chat Session
                  </Button>
                </div>
              </div>
              
              <div className="bg-[#243B67] rounded-lg p-5 border border-[#3A5380] mt-6">
                <div className="flex items-center mb-4">
                  <Phone className="w-5 h-5 text-[#2DD4BF] mr-3" />
                  <h5 className="text-white font-medium">Priority Phone Support</h5>
                </div>
                <p className="text-[#94A3B8] mb-4 text-sm">
                  Available for Enterprise customers. Speak directly with our senior developer support team.
                </p>
                <p className="text-white font-mono text-sm">+1 (888) 555-1234 (Enterprise customers only)</p>
              </div>
              
              <h4 className="text-white text-lg font-semibold mt-8 mb-3">Support Request Form</h4>
              
              <form className="mt-4 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#94A3B8] mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-[#1B2A4A] border border-[#3A5380] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#94A3B8] mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-[#1B2A4A] border border-[#3A5380] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#94A3B8] mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full bg-[#1B2A4A] border border-[#3A5380] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
                    placeholder="Brief description of your issue"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#94A3B8] mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-[#1B2A4A] border border-[#3A5380] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
                    placeholder="Describe your issue in detail"
                  ></textarea>
                </div>
                
                <div>
                  <Button variant="primary" className="w-full md:w-auto">
                    Submit Support Request
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-[#243B67] rounded-lg border border-[#3A5380] animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4">Documentation Resources</h3>
            <p className="text-[#94A3B8] mb-6">
              Before contacting support, you might find answers in our comprehensive documentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/docs/api-documentation" className="flex items-center justify-center p-3 bg-[#2DD4BF] text-[#0A192F] rounded-md hover:bg-[#25C4B3] transition-colors font-medium">
                <Code className="w-4 h-4 mr-2" />
                <span>View API Documentation</span>
              </Link>
            </div>
          </div>
        </DashboardContainer>
      </div>
    </div>
  );
};

export default DeveloperSupport;

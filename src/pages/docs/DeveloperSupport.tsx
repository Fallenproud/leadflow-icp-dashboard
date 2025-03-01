
import React, { useState } from "react";
import { ArrowLeft, Send, MessageSquare, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardContainer from "@/components/layout/DashboardContainer";
import FormInput from "@/components/ui/FormInput";
import { toast } from "sonner";

const DeveloperSupport: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.error("Please fill out all fields");
      return;
    }
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      // In a real app, this would be an API call
      console.log({ name, email, subject, message });
      
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
      
      toast.success("Your support request has been submitted. We'll get back to you soon!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A192F]">
      <div className="container mx-auto px-4 py-8">
        <Link to="/docs/api-reference" className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to API Reference</span>
        </Link>

        <DashboardContainer title="Developer Support">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-[#1B2A4A] border border-[#3A5380] rounded-lg p-6 animate-fade-in h-full">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-[#243B67] rounded-full flex items-center justify-center mr-4">
                    <MessageSquare className="w-6 h-6 text-[#2DD4BF]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Contact Developer Support</h3>
                    <p className="text-[#94A3B8] mt-2">We're here to help with your integration questions</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Your Name"
                      required
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0A192F] text-white border border-[#3A5380] rounded-md p-2"
                    />
                    
                    <FormInput
                      label="Email Address"
                      required
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0A192F] text-white border border-[#3A5380] rounded-md p-2"
                    />
                  </div>
                  
                  <FormInput
                    label="Subject"
                    required
                    placeholder="What's your question about?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#0A192F] text-white border border-[#3A5380] rounded-md p-2"
                  />
                  
                  <div className="form-group">
                    <label htmlFor="message" className="text-white required">Message</label>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder="Describe your issue or question in detail"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#0A192F] text-white border border-[#3A5380] rounded-md p-2 mt-1"
                      required
                    />
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-[#2DD4BF] text-[#0A192F] py-3 px-4 rounded-md hover:bg-[#25C4B3] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Support Request
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-[#1B2A4A] border border-[#3A5380] rounded-lg p-6 mb-6 animate-fade-in">
                <h4 className="text-white font-semibold mb-4">API Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/docs/api-reference" className="text-[#2DD4BF] hover:underline">API Reference</Link>
                  </li>
                  <li>
                    <Link to="/docs/api-documentation" className="text-[#2DD4BF] hover:underline">API Documentation</Link>
                  </li>
                  <li>
                    <Link to="/api-key-management" className="text-[#2DD4BF] hover:underline">API Key Management</Link>
                  </li>
                </ul>
              </div>
              
              <div className="bg-[#1B2A4A] border border-[#3A5380] rounded-lg p-6 animate-fade-in">
                <h4 className="text-white font-semibold mb-4">Alternative Contact Methods</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#243B67] rounded-full flex items-center justify-center mr-3">
                      <Mail className="w-5 h-5 text-[#2DD4BF]" />
                    </div>
                    <div>
                      <p className="text-[#94A3B8] text-sm">Email Support</p>
                      <p className="text-white">developers@example.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#243B67] rounded-full flex items-center justify-center mr-3">
                      <Phone className="w-5 h-5 text-[#2DD4BF]" />
                    </div>
                    <div>
                      <p className="text-[#94A3B8] text-sm">Phone Support</p>
                      <p className="text-white">+1 (800) 123-4567</p>
                      <p className="text-[#94A3B8] text-xs">Mon-Fri, 9am-5pm EST</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DashboardContainer>
      </div>
    </div>
  );
};

export default DeveloperSupport;

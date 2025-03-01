
import React, { useEffect, useState } from "react";
import { Plus, Search, ArrowLeft, Mail, MessageSquare, Linkedin, Tag, FileText, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Template } from "./types";
import { getTemplates, initializeTemplatesIfEmpty } from "@/services/templateService";
import TemplateList from "./TemplateList";

const TemplateDashboard: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    // Initialize with mock data if empty
    initializeTemplatesIfEmpty();
    
    // Load templates from localStorage
    const loadedTemplates = getTemplates();
    setTemplates(loadedTemplates);
    setFilteredTemplates(loadedTemplates);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let result = templates;
    
    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter(template => template.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        template =>
          template.name.toLowerCase().includes(query) ||
          template.content.toLowerCase().includes(query) ||
          (template.subject && template.subject.toLowerCase().includes(query)) ||
          template.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredTemplates(result);
  }, [templates, searchQuery, activeCategory]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
  };

  // Calculate template statistics
  const totalTemplates = templates.length;
  const emailTemplates = templates.filter(t => t.category === "email").length;
  const linkedinTemplates = templates.filter(t => t.category === "linkedin").length;
  const messageTemplates = templates.filter(t => t.category === "message").length;

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
        <div>
          <Link
            to="/lead-automation-and-icp-configuration"
            className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Dashboard</span>
          </Link>
          <h2 className="text-2xl font-bold text-white">Message Templates</h2>
        </div>
        <Link
          to="/lead-automation-and-icp-configuration/templates/new"
          className="inline-flex items-center justify-center bg-[#2DD4BF] text-[#0A192F] px-4 py-2 rounded-md hover:bg-[#25C4B3] transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span>New Template</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2DD4BF]"></div>
        </div>
      ) : (
        <>
          {/* Template Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#94A3B8]">Total Templates</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{totalTemplates}</h3>
                </div>
                <div className="bg-[#243B67] p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-[#2DD4BF]" />
                </div>
              </div>
            </div>
            
            <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#94A3B8]">Email Templates</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{emailTemplates}</h3>
                </div>
                <div className="bg-[#243B67] p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-[#2DD4BF]" />
                </div>
              </div>
            </div>
            
            <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#94A3B8]">LinkedIn Templates</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{linkedinTemplates}</h3>
                </div>
                <div className="bg-[#243B67] p-3 rounded-lg">
                  <Linkedin className="w-6 h-6 text-[#2DD4BF]" />
                </div>
              </div>
            </div>
            
            <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#94A3B8]">Message Templates</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{messageTemplates}</h3>
                </div>
                <div className="bg-[#243B67] p-3 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-[#2DD4BF]" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-[#94A3B8]" />
              </div>
              <input
                type="text"
                className="bg-[#1B2A4A] border border-[#3A5380] text-white rounded-lg block w-full pl-10 p-2.5 focus:outline-none focus:ring-1 focus:ring-[#2DD4BF]"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              <button
                onClick={() => handleCategoryFilter("all")}
                className={`px-3 py-2 rounded-md flex items-center ${activeCategory === "all" ? "bg-[#2DD4BF] text-[#0A192F]" : "bg-[#1B2A4A] text-white border border-[#3A5380]"}`}
              >
                <Filter className="w-4 h-4 mr-1" />
                <span>All</span>
              </button>
              
              <button
                onClick={() => handleCategoryFilter("email")}
                className={`px-3 py-2 rounded-md flex items-center ${activeCategory === "email" ? "bg-[#2DD4BF] text-[#0A192F]" : "bg-[#1B2A4A] text-white border border-[#3A5380]"}`}
              >
                <Mail className="w-4 h-4 mr-1" />
                <span>Email</span>
              </button>
              
              <button
                onClick={() => handleCategoryFilter("linkedin")}
                className={`px-3 py-2 rounded-md flex items-center ${activeCategory === "linkedin" ? "bg-[#2DD4BF] text-[#0A192F]" : "bg-[#1B2A4A] text-white border border-[#3A5380]"}`}
              >
                <Linkedin className="w-4 h-4 mr-1" />
                <span>LinkedIn</span>
              </button>
              
              <button
                onClick={() => handleCategoryFilter("message")}
                className={`px-3 py-2 rounded-md flex items-center ${activeCategory === "message" ? "bg-[#2DD4BF] text-[#0A192F]" : "bg-[#1B2A4A] text-white border border-[#3A5380]"}`}
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                <span>Message</span>
              </button>
              
              <button
                onClick={() => handleCategoryFilter("other")}
                className={`px-3 py-2 rounded-md flex items-center ${activeCategory === "other" ? "bg-[#2DD4BF] text-[#0A192F]" : "bg-[#1B2A4A] text-white border border-[#3A5380]"}`}
              >
                <Tag className="w-4 h-4 mr-1" />
                <span>Other</span>
              </button>
            </div>
          </div>
          
          {/* Template List */}
          <div className="bg-[#1B2A4A] rounded-lg border border-[#3A5380] p-6">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto text-[#3A5380] mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No templates found</h3>
                <p className="text-[#94A3B8] mb-6">
                  {searchQuery || activeCategory !== "all" 
                    ? "Try adjusting your search or filters" 
                    : "Create your first template to get started"}
                </p>
                {!searchQuery && activeCategory === "all" && (
                  <Link
                    to="/lead-automation-and-icp-configuration/templates/new"
                    className="inline-flex items-center justify-center bg-[#2DD4BF] text-[#0A192F] px-4 py-2 rounded-md hover:bg-[#25C4B3] transition-all"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    <span>Create Template</span>
                  </Link>
                )}
              </div>
            ) : (
              <TemplateList templates={filteredTemplates} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TemplateDashboard;

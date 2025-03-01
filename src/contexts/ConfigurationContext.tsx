
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FormData as ICPFormData } from "@/components/features/icp/types";
import { FormData as LeadFormData } from "@/components/features/lead-automation/types";
import { 
  loadICPConfiguration, 
  loadLeadAutomationConfiguration,
  saveConfiguration,
  getLastSavedTimestamp
} from "@/services/configurationService";
import { toast } from "sonner";

interface ConfigurationContextType {
  icpData: ICPFormData;
  leadData: LeadFormData;
  lastSaved: string | null;
  updateICPData: (data: ICPFormData) => void;
  updateLeadData: (data: LeadFormData) => void;
  saveAllConfiguration: () => Promise<void>;
  isConfigSaving: boolean;
}

// Default values
const defaultICPData: ICPFormData = {
  targetIndustries: "",
  companySize: "",
  annualRevenue: "",
  targetLocations: "",
  targetJobTitles: "",
};

const defaultLeadData: LeadFormData = {
  searchUrl: "",
  campaignId: "",
  workspace: "",
  industry: "",
};

// Create context
const ConfigurationContext = createContext<ConfigurationContextType | undefined>(undefined);

// Provider component
export const ConfigurationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [icpData, setICPData] = useState<ICPFormData>(defaultICPData);
  const [leadData, setLeadData] = useState<LeadFormData>(defaultLeadData);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isConfigSaving, setIsConfigSaving] = useState<boolean>(false);

  // Load saved configuration on mount
  useEffect(() => {
    const savedICP = loadICPConfiguration();
    if (savedICP) {
      setICPData(savedICP);
    }

    const savedLead = loadLeadAutomationConfiguration();
    if (savedLead) {
      setLeadData(savedLead);
    }

    const timestamp = getLastSavedTimestamp();
    if (timestamp) {
      setLastSaved(timestamp);
    }
  }, []);

  // Update ICP data
  const updateICPData = (data: ICPFormData) => {
    setICPData(data);
  };

  // Update Lead Automation data
  const updateLeadData = (data: LeadFormData) => {
    setLeadData(data);
  };

  // Save all configuration
  const saveAllConfiguration = async (): Promise<void> => {
    setIsConfigSaving(true);
    
    try {
      // Simulate network delay for visual feedback
      await new Promise(resolve => setTimeout(resolve, 800));
      
      saveConfiguration(icpData, leadData);
      const timestamp = getLastSavedTimestamp();
      setLastSaved(timestamp);
      
      toast.success("Configuration saved successfully", {
        description: "Your ICP and lead automation settings have been saved."
      });
    } catch (error) {
      console.error('Error saving configuration:', error);
      toast.error("Failed to save configuration", {
        description: "Please try again or contact support if the issue persists."
      });
    } finally {
      setIsConfigSaving(false);
    }
  };

  const value = {
    icpData,
    leadData,
    lastSaved,
    updateICPData,
    updateLeadData,
    saveAllConfiguration,
    isConfigSaving
  };

  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  );
};

// Custom hook to use the configuration context
export const useConfiguration = (): ConfigurationContextType => {
  const context = useContext(ConfigurationContext);
  if (context === undefined) {
    throw new Error('useConfiguration must be used within a ConfigurationProvider');
  }
  return context;
};

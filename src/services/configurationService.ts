
// Configuration service to manage ICP and Lead Automation settings

import { FormData as ICPFormData } from "@/components/features/icp/types";
import { FormData as LeadFormData } from "@/components/features/lead-automation/types";

// LocalStorage keys
const ICP_CONFIG_KEY = 'icp_configuration';
const LEAD_CONFIG_KEY = 'lead_automation_configuration';

// Configuration type
export interface Configuration {
  icp: ICPFormData;
  leadAutomation: LeadFormData;
  lastSaved: string;
}

// Save ICP configuration
export const saveICPConfiguration = (data: ICPFormData): void => {
  try {
    localStorage.setItem(ICP_CONFIG_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save ICP configuration:', error);
    throw new Error('Failed to save ICP configuration');
  }
};

// Save Lead Automation configuration
export const saveLeadAutomationConfiguration = (data: LeadFormData): void => {
  try {
    localStorage.setItem(LEAD_CONFIG_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save Lead Automation configuration:', error);
    throw new Error('Failed to save Lead Automation configuration');
  }
};

// Load ICP configuration
export const loadICPConfiguration = (): ICPFormData | null => {
  try {
    const data = localStorage.getItem(ICP_CONFIG_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load ICP configuration:', error);
    return null;
  }
};

// Load Lead Automation configuration
export const loadLeadAutomationConfiguration = (): LeadFormData | null => {
  try {
    const data = localStorage.getItem(LEAD_CONFIG_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load Lead Automation configuration:', error);
    return null;
  }
};

// Save complete configuration
export const saveConfiguration = (icpData: ICPFormData, leadData: LeadFormData): void => {
  try {
    saveICPConfiguration(icpData);
    saveLeadAutomationConfiguration(leadData);
    
    // Save timestamp of last save
    const timestamp = new Date().toISOString();
    localStorage.setItem('config_last_saved', timestamp);
    
    return;
  } catch (error) {
    console.error('Failed to save configuration:', error);
    throw new Error('Failed to save configuration');
  }
};

// Get last saved timestamp
export const getLastSavedTimestamp = (): string | null => {
  return localStorage.getItem('config_last_saved');
};

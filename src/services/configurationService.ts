// Configuration service to manage ICP and Lead Automation settings

import { FormData as ICPFormData } from "@/components/features/icp/types";
import { FormData as LeadFormData } from "@/components/features/lead-automation/types";
import { supabase } from "@/integrations/supabase/client";

// Save ICP configuration (upsert - keep only one row)
export const saveICPConfiguration = async (data: ICPFormData): Promise<void> => {
  // Get existing config
  const { data: existing } = await supabase
    .from('icp_configurations')
    .select('id')
    .limit(1)
    .maybeSingle();

  if (existing) {
    await supabase
      .from('icp_configurations')
      .update({
        target_industries: data.targetIndustries,
        company_size: data.companySize,
        annual_revenue: data.annualRevenue,
        target_locations: data.targetLocations,
        target_job_titles: data.targetJobTitles,
      })
      .eq('id', existing.id);
  } else {
    await supabase
      .from('icp_configurations')
      .insert({
        target_industries: data.targetIndustries,
        company_size: data.companySize,
        annual_revenue: data.annualRevenue,
        target_locations: data.targetLocations,
        target_job_titles: data.targetJobTitles,
      });
  }
};

// Save Lead Automation configuration (upsert - keep only one row)
export const saveLeadAutomationConfiguration = async (data: LeadFormData): Promise<void> => {
  const { data: existing } = await supabase
    .from('lead_automation_configurations')
    .select('id')
    .limit(1)
    .maybeSingle();

  if (existing) {
    await supabase
      .from('lead_automation_configurations')
      .update({
        search_url: data.searchUrl,
        campaign_id: data.campaignId,
        workspace: data.workspace,
        industry: data.industry,
      })
      .eq('id', existing.id);
  } else {
    await supabase
      .from('lead_automation_configurations')
      .insert({
        search_url: data.searchUrl,
        campaign_id: data.campaignId,
        workspace: data.workspace,
        industry: data.industry,
      });
  }
};

// Load ICP configuration
export const loadICPConfiguration = async (): Promise<ICPFormData | null> => {
  const { data, error } = await supabase
    .from('icp_configurations')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;

  return {
    targetIndustries: data.target_industries,
    companySize: data.company_size,
    annualRevenue: data.annual_revenue,
    targetLocations: data.target_locations,
    targetJobTitles: data.target_job_titles,
  };
};

// Load Lead Automation configuration
export const loadLeadAutomationConfiguration = async (): Promise<LeadFormData | null> => {
  const { data, error } = await supabase
    .from('lead_automation_configurations')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;

  return {
    searchUrl: data.search_url,
    campaignId: data.campaign_id,
    workspace: data.workspace,
    industry: data.industry,
  };
};

// Save complete configuration
export const saveConfiguration = async (icpData: ICPFormData, leadData: LeadFormData): Promise<void> => {
  await saveICPConfiguration(icpData);
  await saveLeadAutomationConfiguration(leadData);
};

// Get last saved timestamp
export const getLastSavedTimestamp = async (): Promise<string | null> => {
  const { data } = await supabase
    .from('icp_configurations')
    .select('updated_at')
    .limit(1)
    .maybeSingle();

  return data?.updated_at || null;
};

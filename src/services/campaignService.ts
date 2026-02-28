
import { Campaign, CampaignFormData, CampaignStatus } from "@/components/features/campaigns/types";
import { supabase } from "@/integrations/supabase/client";

// Map DB row to Campaign type
const mapRowToCampaign = (row: any): Campaign => ({
  id: row.id,
  name: row.name,
  description: row.description,
  status: row.status as CampaignStatus,
  target: {
    industries: row.target_industries || [],
    companySize: {
      min: row.target_company_size_min,
      max: row.target_company_size_max,
    },
    locations: row.target_locations || [],
  },
  messaging: {
    subject: row.messaging_subject,
    template: row.messaging_template,
  },
  schedule: {
    startDate: row.schedule_start_date || '',
    endDate: row.schedule_end_date || null,
    frequency: row.schedule_frequency as 'daily' | 'weekly' | 'monthly',
  },
  metrics: {
    sent: row.metrics_sent,
    opened: row.metrics_opened,
    responded: row.metrics_responded,
    converted: row.metrics_converted,
  },
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// Get all campaigns
export const getCampaigns = async (): Promise<Campaign[]> => {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch campaigns:', error);
    return [];
  }

  return (data || []).map(mapRowToCampaign);
};

// Get a single campaign by ID
export const getCampaignById = async (id: string): Promise<Campaign | undefined> => {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) return undefined;
  return mapRowToCampaign(data);
};

// Create a new campaign
export const createCampaign = async (formData: CampaignFormData): Promise<Campaign> => {
  const { data, error } = await supabase
    .from('campaigns')
    .insert({
      name: formData.name,
      description: formData.description,
      status: 'draft',
      target_industries: formData.industries,
      target_company_size_min: formData.minCompanySize,
      target_company_size_max: formData.maxCompanySize,
      target_locations: formData.locations,
      messaging_subject: formData.subject,
      messaging_template: formData.template,
      schedule_start_date: formData.startDate || null,
      schedule_end_date: formData.endDate || null,
      schedule_frequency: formData.frequency,
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to create campaign: ${error.message}`);
  return mapRowToCampaign(data);
};

// Update an existing campaign
export const updateCampaign = async (id: string, formData: Partial<CampaignFormData>): Promise<Campaign | null> => {
  const updateData: Record<string, any> = {};

  if (formData.name !== undefined) updateData.name = formData.name;
  if (formData.description !== undefined) updateData.description = formData.description;
  if (formData.industries !== undefined) updateData.target_industries = formData.industries;
  if (formData.minCompanySize !== undefined) updateData.target_company_size_min = formData.minCompanySize;
  if (formData.maxCompanySize !== undefined) updateData.target_company_size_max = formData.maxCompanySize;
  if (formData.locations !== undefined) updateData.target_locations = formData.locations;
  if (formData.subject !== undefined) updateData.messaging_subject = formData.subject;
  if (formData.template !== undefined) updateData.messaging_template = formData.template;
  if (formData.startDate !== undefined) updateData.schedule_start_date = formData.startDate || null;
  if (formData.endDate !== undefined) updateData.schedule_end_date = formData.endDate || null;
  if (formData.frequency !== undefined) updateData.schedule_frequency = formData.frequency;

  const { data, error } = await supabase
    .from('campaigns')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error || !data) return null;
  return mapRowToCampaign(data);
};

// Update campaign status
export const updateCampaignStatus = async (id: string, status: CampaignStatus): Promise<Campaign | null> => {
  const { data, error } = await supabase
    .from('campaigns')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error || !data) return null;
  return mapRowToCampaign(data);
};

// Delete a campaign
export const deleteCampaign = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('campaigns')
    .delete()
    .eq('id', id);

  return !error;
};

// Initialize with sample campaigns if empty
export const initializeCampaignsIfEmpty = async (): Promise<void> => {
  const { count, error } = await supabase
    .from('campaigns')
    .select('*', { count: 'exact', head: true });

  if (error || (count && count > 0)) return;

  const sampleCampaigns = generateMockCampaigns(5);
  const inserts = sampleCampaigns.map(c => ({
    name: c.name,
    description: c.description,
    status: c.status,
    target_industries: c.target.industries,
    target_company_size_min: c.target.companySize.min,
    target_company_size_max: c.target.companySize.max,
    target_locations: c.target.locations,
    messaging_subject: c.messaging.subject,
    messaging_template: c.messaging.template,
    schedule_start_date: c.schedule.startDate,
    schedule_end_date: c.schedule.endDate,
    schedule_frequency: c.schedule.frequency,
    metrics_sent: c.metrics.sent,
    metrics_opened: c.metrics.opened,
    metrics_responded: c.metrics.responded,
    metrics_converted: c.metrics.converted,
  }));

  await supabase.from('campaigns').insert(inserts);
};

// Generate mock campaign data for testing
export const generateMockCampaigns = (count: number = 5): Campaign[] => {
  const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail'];
  const locations = ['United States', 'Europe', 'Asia', 'Australia', 'Canada'];
  const frequencies = ['daily', 'weekly', 'monthly'] as const;
  const statuses = ['draft', 'active', 'paused', 'completed'] as const;

  const campaigns: Campaign[] = [];

  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const sent = Math.floor(Math.random() * 1000);
    const opened = Math.floor(Math.random() * sent);
    const responded = Math.floor(Math.random() * opened);
    const converted = Math.floor(Math.random() * responded);

    campaigns.push({
      id: crypto.randomUUID(),
      name: `Sample Campaign ${i + 1}`,
      description: `This is a sample campaign for demonstration purposes.`,
      status,
      target: {
        industries: [industries[Math.floor(Math.random() * industries.length)]],
        companySize: {
          min: Math.floor(Math.random() * 50) * 10,
          max: Math.floor(Math.random() * 50) * 100 + 500,
        },
        locations: [locations[Math.floor(Math.random() * locations.length)]],
      },
      messaging: {
        subject: `Discover how we can help your business grow`,
        template: `Hello {{firstName}},\n\nI noticed your company, {{companyName}}, and wanted to reach out.\n\nBest regards,\nThe Team`,
      },
      schedule: {
        startDate: new Date().toISOString(),
        endDate: null,
        frequency: frequencies[Math.floor(Math.random() * frequencies.length)],
      },
      metrics: { sent, opened, responded, converted },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return campaigns;
};

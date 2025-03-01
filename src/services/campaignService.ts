
import { Campaign, CampaignFormData, CampaignStatus } from "@/components/features/campaigns/types";

// Helper to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// LocalStorage key
const CAMPAIGNS_STORAGE_KEY = 'lead_automation_campaigns';

// Get all campaigns from localStorage
export const getCampaigns = (): Campaign[] => {
  const campaignsJson = localStorage.getItem(CAMPAIGNS_STORAGE_KEY);
  if (!campaignsJson) return [];
  
  try {
    return JSON.parse(campaignsJson);
  } catch (error) {
    console.error('Failed to parse campaigns from localStorage:', error);
    return [];
  }
};

// Get a single campaign by ID
export const getCampaignById = (id: string): Campaign | undefined => {
  const campaigns = getCampaigns();
  return campaigns.find(campaign => campaign.id === id);
};

// Save campaigns to localStorage
const saveCampaigns = (campaigns: Campaign[]): void => {
  localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(campaigns));
};

// Create a new campaign
export const createCampaign = (formData: CampaignFormData): Campaign => {
  const campaigns = getCampaigns();
  
  const newCampaign: Campaign = {
    id: generateId(),
    name: formData.name,
    description: formData.description,
    status: 'draft',
    target: {
      industries: formData.industries,
      companySize: {
        min: formData.minCompanySize,
        max: formData.maxCompanySize,
      },
      locations: formData.locations,
    },
    messaging: {
      subject: formData.subject,
      template: formData.template,
    },
    schedule: {
      startDate: formData.startDate,
      endDate: formData.endDate,
      frequency: formData.frequency,
    },
    metrics: {
      sent: 0,
      opened: 0,
      responded: 0,
      converted: 0,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  campaigns.push(newCampaign);
  saveCampaigns(campaigns);
  
  return newCampaign;
};

// Update an existing campaign
export const updateCampaign = (id: string, formData: Partial<CampaignFormData>): Campaign | null => {
  const campaigns = getCampaigns();
  const campaignIndex = campaigns.findIndex(c => c.id === id);
  
  if (campaignIndex === -1) return null;
  
  const campaign = campaigns[campaignIndex];
  const updatedCampaign = {
    ...campaign,
    name: formData.name ?? campaign.name,
    description: formData.description ?? campaign.description,
    target: {
      industries: formData.industries ?? campaign.target.industries,
      companySize: {
        min: formData.minCompanySize ?? campaign.target.companySize.min,
        max: formData.maxCompanySize ?? campaign.target.companySize.max,
      },
      locations: formData.locations ?? campaign.target.locations,
    },
    messaging: {
      subject: formData.subject ?? campaign.messaging.subject,
      template: formData.template ?? campaign.messaging.template,
    },
    schedule: {
      startDate: formData.startDate ?? campaign.schedule.startDate,
      endDate: formData.endDate ?? campaign.schedule.endDate,
      frequency: formData.frequency ?? campaign.schedule.frequency,
    },
    updatedAt: new Date().toISOString(),
  };
  
  campaigns[campaignIndex] = updatedCampaign;
  saveCampaigns(campaigns);
  
  return updatedCampaign;
};

// Update campaign status
export const updateCampaignStatus = (id: string, status: CampaignStatus): Campaign | null => {
  const campaigns = getCampaigns();
  const campaignIndex = campaigns.findIndex(c => c.id === id);
  
  if (campaignIndex === -1) return null;
  
  const campaign = campaigns[campaignIndex];
  const updatedCampaign = {
    ...campaign,
    status,
    updatedAt: new Date().toISOString(),
  };
  
  campaigns[campaignIndex] = updatedCampaign;
  saveCampaigns(campaigns);
  
  return updatedCampaign;
};

// Delete a campaign
export const deleteCampaign = (id: string): boolean => {
  const campaigns = getCampaigns();
  const filteredCampaigns = campaigns.filter(campaign => campaign.id !== id);
  
  if (filteredCampaigns.length === campaigns.length) {
    return false; // Nothing was deleted
  }
  
  saveCampaigns(filteredCampaigns);
  return true;
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
      id: generateId(),
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
        template: `Hello {{firstName}},\n\nI noticed your company, {{companyName}}, and wanted to reach out about our services that could help with your growth goals.\n\nLet me know if you'd like to learn more.\n\nBest regards,\nThe Team`,
      },
      schedule: {
        startDate: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)).toISOString(),
        endDate: Math.random() > 0.5 ? new Date(Date.now() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)).toISOString() : null,
        frequency: frequencies[Math.floor(Math.random() * frequencies.length)],
      },
      metrics: {
        sent,
        opened,
        responded,
        converted,
      },
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 90)).toISOString(),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)).toISOString(),
    });
  }
  
  return campaigns;
};

// Initialize the localStorage with mock data if empty
export const initializeCampaignsIfEmpty = (): void => {
  const campaigns = getCampaigns();
  if (campaigns.length === 0) {
    saveCampaigns(generateMockCampaigns(5));
  }
};

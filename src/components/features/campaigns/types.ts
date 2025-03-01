
export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  target: {
    industries: string[];
    companySize: {
      min: number;
      max: number;
    };
    locations: string[];
  };
  messaging: {
    subject: string;
    template: string;
  };
  schedule: {
    startDate: string;
    endDate: string | null;
    frequency: 'daily' | 'weekly' | 'monthly';
  };
  metrics: {
    sent: number;
    opened: number;
    responded: number;
    converted: number;
  };
  createdAt: string;
  updatedAt: string;
}

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed';

export interface CampaignFormData {
  name: string;
  description: string;
  industries: string[];
  minCompanySize: number;
  maxCompanySize: number;
  locations: string[];
  subject: string;
  template: string;
  startDate: string;
  endDate: string | null;
  frequency: 'daily' | 'weekly' | 'monthly';
}

export interface CampaignErrors extends Partial<Record<keyof CampaignFormData, string>> {}

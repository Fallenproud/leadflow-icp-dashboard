
-- Create timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ==========================================
-- CAMPAIGNS TABLE
-- ==========================================
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  target_industries TEXT[] NOT NULL DEFAULT '{}',
  target_company_size_min INTEGER NOT NULL DEFAULT 0,
  target_company_size_max INTEGER NOT NULL DEFAULT 0,
  target_locations TEXT[] NOT NULL DEFAULT '{}',
  messaging_subject TEXT NOT NULL DEFAULT '',
  messaging_template TEXT NOT NULL DEFAULT '',
  schedule_start_date TIMESTAMP WITH TIME ZONE,
  schedule_end_date TIMESTAMP WITH TIME ZONE,
  schedule_frequency TEXT NOT NULL DEFAULT 'weekly' CHECK (schedule_frequency IN ('daily', 'weekly', 'monthly')),
  metrics_sent INTEGER NOT NULL DEFAULT 0,
  metrics_opened INTEGER NOT NULL DEFAULT 0,
  metrics_responded INTEGER NOT NULL DEFAULT 0,
  metrics_converted INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- Public access for now (no auth yet - will add user_id + RLS later)
CREATE POLICY "Allow all access to campaigns" ON public.campaigns FOR ALL USING (true) WITH CHECK (true);

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- TEMPLATES TABLE
-- ==========================================
CREATE TABLE public.templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'email' CHECK (category IN ('email', 'linkedin', 'message', 'other')),
  subject TEXT,
  content TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to templates" ON public.templates FOR ALL USING (true) WITH CHECK (true);

CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON public.templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- ICP CONFIGURATIONS TABLE
-- ==========================================
CREATE TABLE public.icp_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  target_industries TEXT NOT NULL DEFAULT '',
  company_size TEXT NOT NULL DEFAULT '',
  annual_revenue TEXT NOT NULL DEFAULT '',
  target_locations TEXT NOT NULL DEFAULT '',
  target_job_titles TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.icp_configurations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to icp_configurations" ON public.icp_configurations FOR ALL USING (true) WITH CHECK (true);

CREATE TRIGGER update_icp_configurations_updated_at
  BEFORE UPDATE ON public.icp_configurations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- LEAD AUTOMATION CONFIGURATIONS TABLE
-- ==========================================
CREATE TABLE public.lead_automation_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  search_url TEXT NOT NULL DEFAULT '',
  campaign_id TEXT NOT NULL DEFAULT '',
  workspace TEXT NOT NULL DEFAULT '',
  industry TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.lead_automation_configurations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to lead_automation_configurations" ON public.lead_automation_configurations FOR ALL USING (true) WITH CHECK (true);

CREATE TRIGGER update_lead_automation_configurations_updated_at
  BEFORE UPDATE ON public.lead_automation_configurations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


import { Template, TemplateFormData } from "@/components/features/templates/types";
import { supabase } from "@/integrations/supabase/client";

const mapRowToTemplate = (row: any): Template => ({
  id: row.id,
  name: row.name,
  category: row.category as Template['category'],
  subject: row.subject || undefined,
  content: row.content,
  tags: row.tags || [],
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// Initialize with sample templates if empty
export const initializeTemplatesIfEmpty = async (): Promise<void> => {
  const { count, error } = await supabase
    .from('templates')
    .select('*', { count: 'exact', head: true });

  if (error || (count && count > 0)) return;

  const sampleTemplates = [
    {
      name: "Initial Outreach",
      category: "email",
      subject: "Opportunity to collaborate with {{companyName}}",
      content: "Hi {{firstName}},\n\nI hope this email finds you well. I noticed your work at {{companyName}} and I'm impressed with what you've accomplished in {{industry}}.\n\nI'd love to discuss how our solution could help you with {{painPoint}}.\n\nWould you be open to a brief 15-minute call next week?\n\nBest regards,\n[Your Name]",
      tags: ["cold", "introduction", "collaboration"],
    },
    {
      name: "LinkedIn Connection",
      category: "linkedin",
      content: "Hi {{firstName}}, I noticed your work at {{companyName}} and would love to connect to discuss potential synergies between our companies.",
      tags: ["linkedin", "connection", "networking"],
    },
    {
      name: "Follow-up",
      category: "email",
      subject: "Following up on our previous conversation",
      content: "Hi {{firstName}},\n\nI hope you've been well since our last conversation. I wanted to follow up on the points we discussed regarding {{topic}}.\n\nHave you had a chance to consider our proposal? I'd be happy to address any questions or concerns you might have.\n\nBest regards,\n[Your Name]",
      tags: ["follow-up", "nurture"],
    },
  ];

  await supabase.from('templates').insert(sampleTemplates);
};

// Get all templates
export const getTemplates = async (): Promise<Template[]> => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch templates:', error);
    return [];
  }

  return (data || []).map(mapRowToTemplate);
};

// Get a template by ID
export const getTemplateById = async (id: string): Promise<Template | null> => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) return null;
  return mapRowToTemplate(data);
};

// Create a new template
export const createTemplate = async (templateData: TemplateFormData): Promise<Template> => {
  const { data, error } = await supabase
    .from('templates')
    .insert({
      name: templateData.name,
      category: templateData.category,
      subject: templateData.subject || null,
      content: templateData.content,
      tags: templateData.tags,
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to create template: ${error.message}`);
  return mapRowToTemplate(data);
};

// Update an existing template
export const updateTemplate = async (id: string, templateData: TemplateFormData): Promise<Template | null> => {
  const { data, error } = await supabase
    .from('templates')
    .update({
      name: templateData.name,
      category: templateData.category,
      subject: templateData.subject || null,
      content: templateData.content,
      tags: templateData.tags,
    })
    .eq('id', id)
    .select()
    .single();

  if (error || !data) return null;
  return mapRowToTemplate(data);
};

// Delete a template
export const deleteTemplate = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('templates')
    .delete()
    .eq('id', id);

  return !error;
};

// Get templates by category
export const getTemplatesByCategory = async (category: string): Promise<Template[]> => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) return [];
  return (data || []).map(mapRowToTemplate);
};

// Search templates
export const searchTemplates = async (query: string): Promise<Template[]> => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .or(`name.ilike.%${query}%,content.ilike.%${query}%,subject.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) return [];
  return (data || []).map(mapRowToTemplate);
};

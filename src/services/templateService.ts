
import { Template, TemplateFormData } from "@/components/features/templates/types";
import { v4 as uuidv4 } from 'uuid';

const TEMPLATES_STORAGE_KEY = 'lead_generation_templates';

// Initialize with sample templates if empty
export const initializeTemplatesIfEmpty = (): void => {
  const templates = localStorage.getItem(TEMPLATES_STORAGE_KEY);
  
  if (!templates) {
    const sampleTemplates: Template[] = [
      {
        id: uuidv4(),
        name: "Initial Outreach",
        category: "email",
        subject: "Opportunity to collaborate with {{companyName}}",
        content: "Hi {{firstName}},\n\nI hope this email finds you well. I noticed your work at {{companyName}} and I'm impressed with what you've accomplished in {{industry}}.\n\nI'd love to discuss how our solution could help you with {{painPoint}}.\n\nWould you be open to a brief 15-minute call next week?\n\nBest regards,\n[Your Name]",
        tags: ["cold", "introduction", "collaboration"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: "LinkedIn Connection",
        category: "linkedin",
        content: "Hi {{firstName}}, I noticed your work at {{companyName}} and would love to connect to discuss potential synergies between our companies.",
        tags: ["linkedin", "connection", "networking"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: "Follow-up",
        category: "email",
        subject: "Following up on our previous conversation",
        content: "Hi {{firstName}},\n\nI hope you've been well since our last conversation. I wanted to follow up on the points we discussed regarding {{topic}}.\n\nHave you had a chance to consider our proposal? I'd be happy to address any questions or concerns you might have.\n\nBest regards,\n[Your Name]",
        tags: ["follow-up", "nurture"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(sampleTemplates));
  }
};

// Get all templates
export const getTemplates = (): Template[] => {
  const templates = localStorage.getItem(TEMPLATES_STORAGE_KEY);
  return templates ? JSON.parse(templates) : [];
};

// Get a template by ID
export const getTemplateById = (id: string): Template | null => {
  const templates = getTemplates();
  const template = templates.find(t => t.id === id);
  return template || null;
};

// Create a new template
export const createTemplate = (templateData: TemplateFormData): Template => {
  const templates = getTemplates();
  
  const newTemplate: Template = {
    id: uuidv4(),
    ...templateData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  templates.push(newTemplate);
  localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(templates));
  
  return newTemplate;
};

// Update an existing template
export const updateTemplate = (id: string, templateData: TemplateFormData): Template | null => {
  const templates = getTemplates();
  const templateIndex = templates.findIndex(t => t.id === id);
  
  if (templateIndex === -1) return null;
  
  const updatedTemplate: Template = {
    ...templates[templateIndex],
    ...templateData,
    updatedAt: new Date().toISOString()
  };
  
  templates[templateIndex] = updatedTemplate;
  localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(templates));
  
  return updatedTemplate;
};

// Delete a template
export const deleteTemplate = (id: string): boolean => {
  const templates = getTemplates();
  const filteredTemplates = templates.filter(t => t.id !== id);
  
  if (filteredTemplates.length === templates.length) return false;
  
  localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(filteredTemplates));
  return true;
};

// Get templates by category
export const getTemplatesByCategory = (category: string): Template[] => {
  const templates = getTemplates();
  return templates.filter(t => t.category === category);
};

// Search templates
export const searchTemplates = (query: string): Template[] => {
  const templates = getTemplates();
  const lowerCaseQuery = query.toLowerCase();
  
  return templates.filter(template => 
    template.name.toLowerCase().includes(lowerCaseQuery) ||
    template.content.toLowerCase().includes(lowerCaseQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)) ||
    (template.subject && template.subject.toLowerCase().includes(lowerCaseQuery))
  );
};

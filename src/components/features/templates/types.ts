
export interface Template {
  id: string;
  name: string;
  category: 'email' | 'linkedin' | 'message' | 'other';
  subject?: string; // For email templates
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TemplateFormData {
  name: string;
  category: 'email' | 'linkedin' | 'message' | 'other';
  subject?: string;
  content: string;
  tags: string[];
}


export interface FormData {
  searchUrl: string;
  campaignId: string;
  workspace: string;
  industry: string;
}

export interface ErrorState extends Partial<FormData> {}

export type FormFieldChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

export const workspaceOptions = [
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
  { value: "product", label: "Product" },
  { value: "engineering", label: "Engineering" },
];

export const industryOptions = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
];


export interface FormData {
  targetIndustries: string;
  companySize: string;
  annualRevenue: string;
  targetLocations: string;
  targetJobTitles: string;
}

export interface ErrorState extends Partial<FormData> {}

export type FormFieldChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

export const companySizeOptions = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1001+", label: "1001+ employees" },
];

export const revenueOptions = [
  { value: "<1M", label: "Less than $1M" },
  { value: "1M-10M", label: "1M-10M" },
  { value: "10M-50M", label: "10M-50M" },
  { value: "50M-100M", label: "50M-100M" },
  { value: "100M+", label: "100M+" },
];

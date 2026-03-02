export const Industry_Type = [
  'Information Technology',
  'Finance & Banking',
  'Healthcare',
  'Manufacturing',
  'Retail & E-commerce',
  'Education',
  'Media & Communication',
  'Logistics',
  'Other',
] as const;

export const Company_Size = [
  '1–10',
  '11–50',
  '51–200',
  '201–500',
  '500+',
] as const;
export const Document_Types = [
  'Business Registration Certificate',
  'Tax / GST Registration Document',
] as const;
export const Country_Name = [
  'India',
  'United States',
  'United Kingdom',
  'Germany',
  'UAE',
  'Singapore',
  'Canada',
  'Australia',
] as const;

export type FileType = {
  id: string;
  url: string;
  name: string;
  isDefault: string;
  uploadedAt: string;
};
export type VerificationDocType = {
  type: DocumentType;
  file: string;
};

export type DocumentType = (typeof Document_Types)[number] | '';
export type IndustryType = (typeof Industry_Type)[number];
export type CompanySize = (typeof Company_Size)[number];
export type CountryName = (typeof Country_Name)[number];
export type AddressType = {
  place: string;
  state: string;
  country: CountryName | '';
};

export enum OfficeType {
  Small = "small",
  Medium = "medium",
  Large = "large",
}
  export interface Office {
  id: string;
  name: string;
  createdAt: Date;
  type: OfficeType;
}

export interface OfficesResponse {
  count: number;
  offices: Office[];
  error?: string;
}
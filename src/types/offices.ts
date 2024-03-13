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
  events?: Event[];
}

export interface Event {
  id: string;
  name: string;
  createdAt: Date;
  start: Date;
  end: Date;
  officeId: string;
}

export interface OfficesResponse {
  count: number;
  offices: Office[];
  error?: string;
}

export interface Office {
  id: string;
  name: string;
  createdAt: Date;
  type: string;
}

export interface OfficesResponse {
  count: number;
  offices: Office[];
  error?: string;
}

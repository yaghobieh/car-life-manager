export type OfficialAddressKind = "city" | "street";

export interface OfficialAddress {
  id: string;
  kind: OfficialAddressKind;
  city: string;
  street: string | null;
  cityCode: string;
  streetCode: string | null;
  region: string | null;
  source: "official";
}

export interface SavedAddress {
  id: string;
  userId: string;
  city: string;
  street: string | null;
  cityCode: string | null;
  streetCode: string | null;
  region: string | null;
  source: "official";
  createdAt: string;
}

export interface Lawyer {
  id: string;
  userId: string;
  name: string;
  city: string | null;
  specialty: string | null;
  phone: string | null;
  notes: string | null;
  source: "user";
  createdAt: string;
}

export interface LawyerInput {
  name: string;
  city?: string | null;
  specialty?: string | null;
  phone?: string | null;
  notes?: string | null;
}

export interface SavedAddressInput {
  city: string;
  street?: string | null;
  cityCode?: string | null;
  streetCode?: string | null;
  region?: string | null;
}

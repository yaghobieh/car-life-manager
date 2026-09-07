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

export type UserRole = "owner" | "lawyer" | "seller" | "renter" | "broker" | "car_seller";

export type HomeListedBy = "private" | "broker";

export interface AreaPrice {
  id: string;
  city: string;
  neighborhood: string | null;
  projectName: string | null;
  pricePerMeter: string | null;
  source: "official";
}

export type HomeDealType = "owned" | "sale" | "rent";

export interface Home {
  id: string;
  userId: string;
  dealType: HomeDealType;
  city: string;
  street: string | null;
  houseNumber: string | null;
  neighborhood: string | null;
  rooms: number | null;
  sqm: number | null;
  floor: number | null;
  price: number | null;
  currency: "ILS";
  features: string[];
  imageUrls: string[];
  model3dUrl: string | null;
  nextDueDate: string | null;
  nextDueTitle: string | null;
  notes: string | null;
  source: "user";
  createdAt: string;
}

export interface HomeInput {
  dealType: HomeDealType;
  city: string;
  street?: string | null;
  houseNumber?: string | null;
  neighborhood?: string | null;
  rooms?: number | null;
  sqm?: number | null;
  floor?: number | null;
  price?: number | null;
  features?: string[];
  imageUrls?: string[];
  model3dUrl?: string | null;
  nextDueDate?: string | null;
  nextDueTitle?: string | null;
  notes?: string | null;
}

export interface PropertyExpense {
  id: string;
  userId: string;
  category: string;
  amount: number;
  currency: "ILS";
  occurredAt: string;
  description: string | null;
  createdAt: string;
}

export interface PropertyExpenseInput {
  category: string;
  amount: number;
  occurredAt: string;
  description?: string | null;
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

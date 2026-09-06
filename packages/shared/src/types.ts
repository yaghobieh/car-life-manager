export type DataProvenance =
  | "verified"
  | "official"
  | "user"
  | "calculated"
  | "estimated"
  | "unavailable"
  | "development";

export type ConnectionStatus =
  | "connected"
  | "not_connected"
  | "connection_required"
  | "unknown"
  | "not_supported";

export type TaskStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "not_applicable"
  | "needs_attention"
  | "waiting_for_user"
  | "waiting_for_provider";

export type TaskPriority = "overdue" | "important" | "normal" | "done";

export type VehicleStatusKind =
  | "healthy"
  | "attention"
  | "action_required"
  | "unknown"
  | "expired";

export type ExpenseCategory =
  | "fuel"
  | "insurance"
  | "parking"
  | "tolls"
  | "maintenance"
  | "repairs"
  | "tires"
  | "registration"
  | "test"
  | "accessories"
  | "other";

export type DocumentType =
  | "vehicle_license"
  | "purchase_agreement"
  | "insurance"
  | "test_certificate"
  | "service_invoice"
  | "repair_invoice"
  | "other";

export interface DataField<T> {
  value: T | null;
  provenance: DataProvenance;
  source?: string;
  updatedAt?: string;
}

export interface Vehicle {
  id: string;
  userId: string;
  registrationNumber: string;
  formattedRegistrationNumber: string;
  make: string | null;
  model: string | null;
  modelYear: number | null;
  fuelType: string | null;
  engine: string | null;
  color: string | null;
  registrationDate: string | null;
  registrationExpiry: string | null;
  lastTestDate: string | null;
  nextTestDate: string | null;
  ownershipSequence: number | null;
  ownershipType: string | null;
  mileage: number | null;
  dataSource: string;
  dataProvenance: DataProvenance;
  dataSourceUpdatedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleLookupResult {
  vehicle: Omit<Vehicle, "id" | "userId" | "createdAt" | "updatedAt">;
  rawAvailable: boolean;
}

export interface Task {
  id: string;
  vehicleId: string;
  title: string;
  description: string;
  category: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | null;
  provider: string | null;
  source: string;
  externalUrl: string | null;
  createdAt: string;
  completedAt: string | null;
}

export interface ServiceProviderInfo {
  providerId: string;
  name: string;
  category: "parking" | "toll" | "insurance" | "other";
  officialUrl: string | null;
  status: ConnectionStatus;
  lastCheckedAt: string | null;
  note: string;
}

export interface Expense {
  id: string;
  vehicleId: string;
  category: ExpenseCategory;
  amount: number;
  currency: "ILS";
  merchant: string | null;
  occurredAt: string;
  description: string | null;
  recurring: boolean;
  attachmentId: string | null;
  createdAt: string;
}

export interface ExpenseSummary {
  currentMonth: number;
  previousMonth: number;
  yearlyTotal: number;
  averageMonthly: number;
  byCategory: Array<{ category: ExpenseCategory; amount: number }>;
  hasData: boolean;
}

export interface VehicleDocument {
  id: string;
  vehicleId: string;
  type: DocumentType;
  title: string;
  notes: string | null;
  expiresAt: string | null;
  storageKey: string;
  createdAt: string;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  serviceDate: string;
  mileage: number | null;
  garage: string | null;
  serviceType: string;
  parts: string | null;
  cost: number | null;
  notes: string | null;
  createdAt: string;
}

export interface Reminder {
  id: string;
  vehicleId: string;
  title: string;
  dueDate: string;
  remindAt: string | null;
  recurrence: string | null;
  status: "upcoming" | "due" | "completed" | "dismissed";
  createdAt: string;
}

export interface IdentityVerification {
  id: string;
  userId: string;
  provider: string;
  status: "pending" | "verified" | "failed" | "expired" | "revoked" | "unavailable";
  verifiedAt: string | null;
  externalReference: string | null;
}

export interface VehicleContext {
  vehicle: Vehicle;
  services: ServiceProviderInfo[];
  expenses: Expense[];
  documents: VehicleDocument[];
}

export interface ProviderCapabilities {
  lookup: boolean;
  connectionStatus: boolean;
  connect: boolean;
  vehicleScoped: boolean;
}

export interface ProviderContext {
  vehicleId: string;
  userId: string;
  registrationNumber: string;
}

export type NotificationChannel = "email" | "sms" | "in_app";
export type NotificationStatus = "sent" | "skipped" | "failed";

export interface NotifyUser {
  id: string;
  email: string | null;
  phone: string | null;
  notifyEmail: boolean;
  notifySms: boolean;
}

export interface ReminderDispatchInput {
  id: string;
  title: string;
  dueDate: string;
  vehicleId: string;
}

export interface ChannelResult {
  channel: NotificationChannel;
  status: NotificationStatus;
  error?: string;
}

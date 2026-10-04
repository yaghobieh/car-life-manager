export interface SettingsFormState {
  name: string;
  username: string;
  phone: string;
  notifyEmail: boolean;
  notifySms: boolean;
}

export interface SettingsPhotoProps {
  imageUrl: string | null;
  displayName: string;
  size: number;
}

export interface SettingsStatusProps {
  errorKey: string;
  saved: boolean;
  errorText: string;
  savedText: string;
}

export interface SettingsToggleProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

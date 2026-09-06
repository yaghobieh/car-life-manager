export type AuthMode = 'login' | 'register';

export interface AuthGoogleButtonProps {
  enabled: boolean;
  label: string;
  unavailableText: string;
  onUnavailable: () => void;
}

export interface AuthFormState {
  email: string;
  password: string;
  name: string;
}

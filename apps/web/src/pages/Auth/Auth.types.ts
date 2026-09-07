export type AuthMode = 'login' | 'register';

export interface AuthProviderButtonProps {
  enabled: boolean;
  label: string;
  unavailableText: string;
  href: string;
  iconSrc?: string;
  onUnavailable: () => void;
}

export interface AuthGoogleButtonProps extends AuthProviderButtonProps {}

export interface AuthFormState {
  email: string;
  password: string;
  name: string;
}

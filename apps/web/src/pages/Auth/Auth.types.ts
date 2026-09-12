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
  identifier: string;
  email: string;
  username: string;
  password: string;
  name: string;
}

export interface AuthRegisterRoleSelectProps {
  id?: string;
  testId?: string;
  role: string;
  onRoleChange: (value: string) => void;
}

export interface AuthRegisterPanelProps {
  role: string;
  onRoleChange: (value: string) => void;
  city: string;
  onCityChange: (value: string) => void;
}

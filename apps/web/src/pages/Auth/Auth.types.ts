export type AuthMode = 'login' | 'register';

export interface AuthFormState {
  email: string;
  password: string;
  name: string;
}

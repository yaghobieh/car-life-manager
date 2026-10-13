export interface AuthUser {
  id: string;
  email: string | null;
  name: string | null;
  role: string;
}

export interface AuthResponse {
  user: AuthUser;
  token?: string;
}

export interface Home {
  id: string;
  city: string;
  street: string | null;
  dealType: string;
}

export interface HomesResponse {
  homes: Home[];
}

export interface ApiErrorBody {
  error?: string;
  code?: string;
}

export interface LoginScreenProps {
  colors: Palette;
  onSignedIn: (session: AuthResponse) => void;
  onBack: () => void;
}

export interface RegisterFieldsProps {
  name: string;
  username: string;
  email: string;
  onName: (value: string) => void;
  onUsername: (value: string) => void;
  onEmail: (value: string) => void;
}

export interface LoginFieldsProps {
  identifier: string;
  onIdentifier: (value: string) => void;
}

export interface AuthFieldsProps extends RegisterFieldsProps, LoginFieldsProps {
  isRegister: boolean;
}

export interface HomesScreenProps {
  token: string;
  user: AuthUser;
  onSignOut: () => void;
}

export interface AppGateProps {
  session: AuthResponse | null;
  showLogin: boolean;
  product: string;
  colors: Palette;
  onSignedIn: (session: AuthResponse) => void;
  onSignOut: () => void;
  onOpenLogin: (product: string) => void;
  onTheme: () => void;
  themeLabel: string;
}

export interface Palette {
  paper: string;
  surface: string;
  ink: string;
  inkSoft: string;
  line: string;
  blue: string;
  navy: string;
  white: string;
  bad: string;
}

export interface MobileSection {
  id: string;
  label: string;
  kind: string;
  listKey: string;
  empty: string;
}

export interface MobileRow {
  id: string;
  title: string;
  body: string;
}

export interface LandingScreenProps {
  colors: Palette;
  themeLabel: string;
  onTheme: () => void;
  onOpenLogin: (product: string) => void;
}

export interface ShellScreenProps {
  token: string;
  user: AuthUser;
  product: string;
  colors: Palette;
  themeLabel: string;
  onTheme: () => void;
  onProduct: (product: string) => void;
  onSignOut: () => void;
}

export interface ChipBarProps {
  items: Array<{ id: string; label: string }>;
  selectedId: string;
  colors: Palette;
  onSelect: (id: string) => void;
}

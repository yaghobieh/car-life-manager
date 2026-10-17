import { SVG_GOOGLE } from '@const';
import type { AuthGoogleButtonProps } from '../Auth.types';
import { AuthProviderButton } from './AuthProviderButton';

export function AuthGoogleButton(props: AuthGoogleButtonProps) {
  return <AuthProviderButton {...props} iconSrc={SVG_GOOGLE} />;
}

import { LandingScreen } from '../LandingScreen';
import { LoginScreen } from '../LoginScreen';
import { ShellScreen } from '../ShellScreen';
import type { AppGateProps } from '../mobile.types';

export function AppGate(props: AppGateProps) {
  const { session, showLogin, product, colors, onSignedIn, onSignOut, onOpenLogin, onTheme, themeLabel } = props;
  if (session?.token && session.user) {
    return (
      <ShellScreen
        token={session.token}
        user={session.user}
        product={product}
        colors={colors}
        themeLabel={themeLabel}
        onTheme={onTheme}
        onProduct={onOpenLogin}
        onSignOut={onSignOut}
      />
    );
  }
  if (showLogin) {
    return <LoginScreen colors={colors} onSignedIn={onSignedIn} onBack={() => onOpenLogin('')} />;
  }
  return <LandingScreen colors={colors} themeLabel={themeLabel} onTheme={onTheme} onOpenLogin={onOpenLogin} />;
}

import { Button, Flex } from '@forgedevstack/bear';
import { api } from '@api';
import { FLEX_GAP_SM, SVG_GOOGLE, SVG_GOOGLE_SIZE } from '@const';
import type { AuthGoogleButtonProps } from '../Auth.types';

export function AuthGoogleButton(props: AuthGoogleButtonProps) {
  const { enabled, label, unavailableText, onUnavailable } = props;

  function startGoogle() {
    if (!enabled) {
      onUnavailable();
      return;
    }
    window.location.href = api.googleStart;
  }

  return (
    <Button
      className="Bear-AuthGoogleButton"
      variant="secondary"
      fullWidth
      onClick={startGoogle}
      aria-label={enabled ? label : unavailableText}
    >
      <Flex align="center" justify="center" gap={FLEX_GAP_SM}>
        <img src={SVG_GOOGLE} alt="" width={SVG_GOOGLE_SIZE} height={SVG_GOOGLE_SIZE} />
        {label}
      </Flex>
    </Button>
  );
}

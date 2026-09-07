import { Button, Flex } from '@forgedevstack/bear';
import { FLEX_GAP_SM, SVG_GOOGLE_SIZE } from '@const';
import type { AuthProviderButtonProps } from '../Auth.types';

export function AuthProviderButton(props: AuthProviderButtonProps) {
  const { enabled, label, unavailableText, href, iconSrc, onUnavailable } = props;

  function start() {
    if (!enabled) {
      onUnavailable();
      return;
    }
    window.location.href = href;
  }

  return (
    <Button
      className="Bear-AuthProviderButton"
      variant="secondary"
      fullWidth
      onClick={start}
      aria-label={enabled ? label : unavailableText}
    >
      <Flex align="center" justify="center" gap={FLEX_GAP_SM}>
        {iconSrc ? <img src={iconSrc} alt="" width={SVG_GOOGLE_SIZE} height={SVG_GOOGLE_SIZE} /> : null}
        {label}
      </Flex>
    </Button>
  );
}

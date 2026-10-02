import { useBearMode } from '@forgedevstack/bear';
import { THEME_MODE_DARK } from '@const';
import { resolveBearId, useBearId } from '@hooks';
import type { ThemeToggleProps } from './ThemeToggle.types';

export function ThemeToggle(props: ThemeToggleProps) {
  const { id, testId, lightLabel, darkLabel } = props;
  const { mode, toggleMode } = useBearMode();
  const generatedId = useBearId('ThemeToggle');
  const domId = resolveBearId(id, generatedId);
  const isDark = mode === THEME_MODE_DARK;

  return (
    <button
      id={domId}
      data-testid={testId}
      type="button"
      className="Clm-theme-toggle Bear-ThemeToggle"
      aria-label={isDark ? lightLabel : darkLabel}
      aria-pressed={isDark}
      onClick={toggleMode}
    >
      <span className="Clm-theme-toggle__knob" aria-hidden="true" />
    </button>
  );
}

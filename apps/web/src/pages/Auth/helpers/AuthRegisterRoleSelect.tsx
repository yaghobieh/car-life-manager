import { Select } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { resolveBearId, useBearId } from '@hooks';
import { AUTH_ROLE_OPTIONS } from '../Auth.const';
import type { AuthRegisterRoleSelectProps } from '../Auth.types';
import { roleLabelKey } from '../Auth.utils';

export function AuthRegisterRoleSelect(props: AuthRegisterRoleSelectProps) {
  const { id, testId, role, onRoleChange } = props;
  const t = useTranslate();
  const generatedId = useBearId('AuthRegisterRoleSelect');
  const domId = resolveBearId(id, generatedId);

  return (
    <Select
      id={domId}
      data-testid={testId}
      label={t('accountRole')}
      value={role}
      onChange={onRoleChange}
      fullWidth
      options={AUTH_ROLE_OPTIONS.map((value) => ({ value, label: t(roleLabelKey(value)) }))}
    />
  );
}

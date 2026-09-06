import { Box, Button, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { COLOR_MENU_SCRIM, COLOR_NAVY_DEEP, COLOR_WHITE, FLEX_GAP_MD, ZERO } from '@const';
import { LocaleSelect } from '@components/LocaleSelect';
import type { AppShellMenuProps } from './AppShell.types';
import { navButtonVariant } from './AppShell.utils';

export function AppShellMenu(props: AppShellMenuProps) {
  const { isOpen, items, activeId, onClose, onNavigate } = props;
  const t = useTranslate();

  if (!isOpen) return null;

  return (
    <Box className="Bear-AppShellMenu bear-fixed bear-inset-0 bear-z-50">
      <Box className="bear-absolute bear-inset-0" bg={COLOR_MENU_SCRIM} onClick={onClose} />
      <Box as="nav" bg={COLOR_NAVY_DEEP} p={4} className="bear-absolute bear-bottom-0 bear-left-0 bear-right-0">
        <Flex direction="column" gap={FLEX_GAP_MD}>
          <Typography color={COLOR_WHITE} weight="bold">{t('menu')}</Typography>
          {items.map((item) => (
            <Button
              key={item.id}
              variant={navButtonVariant(item.id === activeId)}
              fullWidth
              disableElevation
              className="bear-justify-start"
              style={{ borderWidth: ZERO }}
              onClick={() => onNavigate(item.to)}
            >
              {t(item.labelKey)}
            </Button>
          ))}
          <LocaleSelect fullWidth />
        </Flex>
      </Box>
    </Box>
  );
}

import { Box, Button, Flex, Input, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { useNavigate } from 'react-router-dom';
import {
  COLOR_CARD,
  COLOR_LINE,
  COLOR_MUTED,
  EMPTY_STRING,
  FLEX_GAP_SM,
  SEARCH_MIN_LENGTH,
  SEARCH_OVERLAY_Z,
  ZERO,
} from '@const';
import { useAppState } from '@hooks';
import type { AppShellSearchProps } from '@components/AppShell/AppShell.types';
import { searchHits } from '@components/AppShell/AppShell.utils';

export function AppShellSearch(props: AppShellSearchProps) {
  const { query, onQueryChange } = props;
  const { vehicles, dashboard, select } = useAppState();
  const navigate = useNavigate();
  const t = useTranslate();
  const hits = searchHits(query, vehicles, dashboard?.tasks ?? [], dashboard?.services ?? [], t);
  const showResults = query.trim().length >= SEARCH_MIN_LENGTH;

  function openHit(to: string, vehicleId?: string) {
    if (vehicleId) select(vehicleId);
    onQueryChange(EMPTY_STRING);
    navigate(to);
  }

  return (
    <Box className="Bear-AppShellSearch" style={{ position: 'relative', flex: 1, minWidth: 0 }}>
      <Input
        aria-label={t('search')}
        placeholder={t('search')}
        radius="pill"
        fullWidth
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      {showResults && (
        <Box
          className="Bear-AppShellSearch__results"
          bg={COLOR_CARD}
          p={2}
          rounded="lg"
          shadow="md"
          style={{
            position: 'absolute',
            top: '100%',
            insetInline: ZERO,
            zIndex: SEARCH_OVERLAY_Z,
            border: `1px solid ${COLOR_LINE}`,
            marginTop: 8,
          }}
        >
          {hits.length === ZERO && (
            <Typography color={COLOR_MUTED}>{t('noSearchResults')}</Typography>
          )}
          <Flex direction="column" gap={FLEX_GAP_SM}>
            {hits.map((hit) => (
              <Button
                key={hit.id}
                variant="ghost"
                fullWidth
                disableElevation
                className="bear-justify-start"
                onClick={() => openHit(hit.to, hit.vehicleId)}
              >
                <Flex direction="column">
                  <Typography weight="bold">{hit.title}</Typography>
                  <Typography color={COLOR_MUTED}>{hit.subtitle}</Typography>
                </Flex>
              </Button>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
}

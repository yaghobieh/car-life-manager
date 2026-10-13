import { Input } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { useNavigate } from 'react-router-dom';
import { EMPTY_STRING, SEARCH_MIN_LENGTH, ZERO } from '@const';
import { useAppState } from '@hooks';
import type { AppShellSearchProps } from '../../AppShell.types';
import { searchHits } from '../../AppShell.utils';

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
    <div className="Clm-search">
      <Input
        aria-label={t('search')}
        placeholder={t('search')}
        radius="pill"
        fullWidth
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      {showResults && (
        <div className="Clm-search-results">
          {hits.length === ZERO && <div className="Clm-search-hit"><span>{t('noSearchResults')}</span></div>}
          {hits.map((hit) => (
            <button
              key={hit.id}
              type="button"
              className="Clm-search-hit"
              onClick={() => openHit(hit.to, hit.vehicleId)}
            >
              <b>{hit.title}</b>
              <span>{hit.subtitle}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

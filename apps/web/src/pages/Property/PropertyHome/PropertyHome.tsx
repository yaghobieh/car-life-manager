import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslate } from '@forgedevstack/lingo/react';
import { ADDRESS_QUERY_PARAM, EMPTY_STRING, ROUTE_PROPERTY_SEARCH, SEARCH_MIN_LENGTH, SVG_EMPTY_PROPERTY } from '@const';
import { AddressSearchBoard } from '@components/AddressSearchBoard';
import { ClmEmpty, ClmPageHead } from '@common';
import { usePropertyState } from '@hooks';

export function PropertyHome() {
  const t = useTranslate();
  const navigate = useNavigate();
  const { search, searching } = usePropertyState();
  const [query, setQuery] = useState(EMPTY_STRING);

  async function submitSearch() {
    const next = query.trim();
    if (next.length < SEARCH_MIN_LENGTH) return;
    await search(next);
    navigate(`${ROUTE_PROPERTY_SEARCH}?${ADDRESS_QUERY_PARAM}=${encodeURIComponent(next)}`);
  }

  return (
    <div className="Bear-PropertyHome">
      <ClmPageHead title={t('propertyOverview')} subtitle={t('pageSubProperty')} />
      <AddressSearchBoard
        query={query}
        onQueryChange={setQuery}
        onSearch={() => void submitSearch()}
        busy={searching}
      />
      <ClmEmpty
        iconSrc={SVG_EMPTY_PROPERTY}
        title={t('propertyEmptyTitle')}
        body={t('propertyEmptyBody')}
      />
    </div>
  );
}

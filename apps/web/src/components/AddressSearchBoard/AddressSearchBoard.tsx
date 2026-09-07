import { useRef } from 'react';
import { Button, Flex, Input, Select } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import type { OfficialAddress } from '@clm/shared';
import { FLEX_GAP_MD, SEARCH_DEBOUNCE_MS, SEARCH_MIN_LENGTH, ZERO } from '@const';
import { AddressSuggestList } from './AddressSuggestList';
import type { AddressSearchBoardProps } from './AddressSearchBoard.types';

export function AddressSearchBoard(props: AddressSearchBoardProps) {
  const {
    query,
    onQueryChange,
    onSearch,
    onLiveSearch,
    onClear,
    onPick,
    suggestions = [],
    busy = false,
    hint,
    hideSubmit = false,
    dealType,
    onDealTypeChange,
    dealOptions,
  } = props;
  const t = useTranslate();
  const timerRef = useRef<number>(ZERO);
  const showDeal = Boolean(dealType && onDealTypeChange && dealOptions);

  function scheduleLive(value: string) {
    if (!onLiveSearch) return;
    window.clearTimeout(timerRef.current);
    const next = value.trim();
    if (next.length < SEARCH_MIN_LENGTH) {
      onClear?.();
      return;
    }
    timerRef.current = window.setTimeout(() => {
      onLiveSearch(next);
    }, SEARCH_DEBOUNCE_MS);
  }

  function pick(address: OfficialAddress) {
    onPick?.(address);
  }

  const showSuggest = suggestions.length > ZERO && Boolean(onPick);

  return (
    <form
      className="Clm-discover Bear-AddressSearchBoard"
      onSubmit={(event) => {
        event.preventDefault();
        window.clearTimeout(timerRef.current);
        onSearch();
      }}
    >
      <Flex direction="column" gap={FLEX_GAP_MD}>
        {showDeal ? (
          <div className="Clm-search-pill">
            <Input
              aria-label={t('propertySearchLabel')}
              value={query}
              onChange={(event) => {
                onQueryChange(event.target.value);
                scheduleLive(event.target.value);
              }}
              placeholder={t('propertyHeroPlaceholder')}
              fullWidth
              autoComplete="off"
            />
            <Select
              aria-label={t('dealType')}
              value={dealType}
              onChange={onDealTypeChange}
              options={dealOptions ?? []}
            />
          </div>
        ) : (
          <Input
            label={t('propertySearchLabel')}
            value={query}
            onChange={(event) => {
              onQueryChange(event.target.value);
              scheduleLive(event.target.value);
            }}
            placeholder={t('propertySearchPlaceholder')}
            fullWidth
            autoComplete="off"
          />
        )}
        {showSuggest ? <AddressSuggestList suggestions={suggestions} onPick={pick} /> : null}
        {hideSubmit ? null : (
          <Button variant="primary" type="submit" loading={busy} loadingText={t('checking')}>
            {t('propertySearchCta')}
          </Button>
        )}
        <p className="Clm-page-sub">{hint ?? t('propertySearchHint')}</p>
      </Flex>
    </form>
  );
}

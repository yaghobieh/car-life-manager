import { Button, Flex, Input } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { FLEX_GAP_MD } from '@const';
import type { AddressSearchBoardProps } from './AddressSearchBoard.types';

export function AddressSearchBoard(props: AddressSearchBoardProps) {
  const { query, onQueryChange, onSearch, busy = false, hint } = props;
  const t = useTranslate();

  return (
    <form
      className="Clm-discover Bear-AddressSearchBoard"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <Flex direction="column" gap={FLEX_GAP_MD}>
        <Input
          label={t('propertySearchLabel')}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={t('propertySearchPlaceholder')}
          fullWidth
        />
        <Button variant="primary" type="submit" loading={busy} loadingText={t('checking')}>
          {t('propertySearchCta')}
        </Button>
        <p className="Clm-page-sub">{hint ?? t('propertySearchHint')}</p>
      </Flex>
    </form>
  );
}

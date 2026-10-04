import { useState } from 'react';
import { Button, Flex, Input } from '@forgedevstack/bear';
import { EMPTY_STRING, FLEX_GAP_SM, KEY_ENTER } from '@const';
import { resolveBearId, useBearId } from '@hooks';
import type { LandingSearchProps } from '../Landing.types';

export function LandingSearch(props: LandingSearchProps) {
  const { id, testId, label, placeholder, onSearch } = props;
  const generatedId = useBearId('LandingSearch');
  const domId = resolveBearId(id, generatedId);
  const [query, setQuery] = useState(EMPTY_STRING);

  function submit() {
    onSearch(query);
  }

  return (
    <Flex id={domId} data-testid={testId} className="Bear-Landing__search" gap={FLEX_GAP_SM} align="end">
      <Input
        label={label}
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === KEY_ENTER) submit();
        }}
        fullWidth
      />
      <Button variant="primary" onClick={submit}>{label}</Button>
    </Flex>
  );
}

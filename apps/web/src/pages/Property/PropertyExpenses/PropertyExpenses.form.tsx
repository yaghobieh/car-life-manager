import { useState } from 'react';
import { Button, Flex, Input, Select } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { DATE_SLICE_LENGTH, EMPTY_STRING, FLEX_GAP_MD, PROPERTY_EXPENSE_MORTGAGE, ZERO } from '@const';
import { usePropertyState } from '@hooks';
import { PROPERTY_EXPENSE_OPTIONS } from '../Property.const';

export function PropertyExpensesForm() {
  const t = useTranslate();
  const { addPropertyExpense } = usePropertyState();
  const [category, setCategory] = useState(PROPERTY_EXPENSE_MORTGAGE);
  const [amount, setAmount] = useState(EMPTY_STRING);
  const [occurredAt, setOccurredAt] = useState(new Date().toISOString().slice(ZERO, DATE_SLICE_LENGTH));
  const [description, setDescription] = useState(EMPTY_STRING);
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!amount) return;
    setBusy(true);
    try {
      await addPropertyExpense({
        category,
        amount: Number(amount),
        occurredAt: new Date(occurredAt).toISOString(),
        description: description || null,
      });
      setAmount(EMPTY_STRING);
      setDescription(EMPTY_STRING);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="Clm-card">
      <Flex className="Bear-PropertyExpensesForm Clm-form" direction="column" gap={FLEX_GAP_MD}>
        <Select
          label={t('category')}
          value={category}
          onChange={setCategory}
          fullWidth
          options={PROPERTY_EXPENSE_OPTIONS.map((value) => ({
            value,
            label: t(`propertyExpense_${value}`),
          }))}
        />
        <Input label={t('amount')} type="number" value={amount} onChange={(event) => setAmount(event.target.value)} fullWidth />
        <Input label={t('date')} type="date" value={occurredAt} onChange={(event) => setOccurredAt(event.target.value)} fullWidth />
        <Input label={t('description')} value={description} onChange={(event) => setDescription(event.target.value)} fullWidth />
        <Button variant="primary" loading={busy} loadingText={t('saving')} onClick={() => void submit()}>
          {t('addExpense')}
        </Button>
      </Flex>
    </div>
  );
}

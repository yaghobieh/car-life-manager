import { useState } from 'react';
import { Button, Input, Select } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import type { ExpenseCategory } from '@clm/shared';
import { api } from '@api';
import {
  DATE_SLICE_LENGTH,
  EMPTY_STRING,
  EXPENSE_CATEGORY_FUEL,
  QUERY_CATEGORY,
} from '@const';
import { ClmSectionTitle } from '@common';
import { useAppState } from '@hooks';
import { useSearchParams } from 'react-router-dom';
import { EXPENSE_CATEGORY_OPTIONS } from './Expenses.const';

export function ExpensesForm() {
  const { currentId, refresh } = useAppState();
  const t = useTranslate();
  const [params] = useSearchParams();
  const preset = params.get(QUERY_CATEGORY);
  const presetCategory = EXPENSE_CATEGORY_OPTIONS.find((option) => option === preset);
  const [category, setCategory] = useState<string>(presetCategory ?? EXPENSE_CATEGORY_FUEL);
  const [amount, setAmount] = useState(EMPTY_STRING);
  const [occurredAt, setOccurredAt] = useState(new Date().toISOString().slice(0, DATE_SLICE_LENGTH));
  const [merchant, setMerchant] = useState(EMPTY_STRING);
  const [description, setDescription] = useState(EMPTY_STRING);
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!currentId) return;
    setBusy(true);
    try {
      await api.addExpense(currentId, {
        category: category as ExpenseCategory,
        amount: Number(amount),
        occurredAt: new Date(occurredAt).toISOString(),
        merchant: merchant || null,
        description: description || null,
        recurring: false,
      });
      setAmount(EMPTY_STRING);
      setMerchant(EMPTY_STRING);
      setDescription(EMPTY_STRING);
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="Clm-form-card Bear-ExpensesForm">
      <ClmSectionTitle title={t('expenseFormTitle')} />
      <Select
        label={t('category')}
        value={category}
        onChange={setCategory}
        fullWidth
        options={EXPENSE_CATEGORY_OPTIONS.map((value) => ({
          value,
          label: t(`expense_${value}`),
        }))}
      />
      <div className="Clm-form-row">
        <Input label={t('amount')} type="number" value={amount} onChange={(event) => setAmount(event.target.value)} fullWidth />
        <Input label={t('date')} type="date" value={occurredAt} onChange={(event) => setOccurredAt(event.target.value)} fullWidth />
      </div>
      <div className="Clm-form-row">
        <Input label={t('merchant')} value={merchant} onChange={(event) => setMerchant(event.target.value)} fullWidth />
        <Input label={t('description')} value={description} onChange={(event) => setDescription(event.target.value)} fullWidth />
      </div>
      <Button variant="primary" loading={busy} loadingText={t('saving')} onClick={() => void submit()}>
        {t('addExpense')}
      </Button>
    </div>
  );
}

import { Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { useNavigate } from 'react-router-dom';
import { CARD_RADIUS_XL, COLOR_BLUE, CURRENCY_ILS, FLEX_GAP_MD, FLEX_GAP_SM, ROUTE_EXPENSES, TYPO_SECTION_TITLE } from '@const';
import { EmptyState } from '@components/EmptyState';
import type { OverviewExpensesProps } from './Overview.types';
import { hasExpenseData } from './Overview.utils';

export function OverviewExpenses(props: OverviewExpensesProps) {
  const { expenseSummary } = props;
  const navigate = useNavigate();
  const t = useTranslate();
  const { formatCurrency } = useLingoFormat();

  if (hasExpenseData(expenseSummary)) {
    return (
      <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
        <Flex direction="column" gap={FLEX_GAP_MD}>
          <Typography variant={TYPO_SECTION_TITLE}>{t('monthlyExpenses')}</Typography>
          <Flex direction="column" gap={FLEX_GAP_SM}>
            {expenseSummary.byCategory.map((row) => (
              <Flex justify="between" key={row.category}>
                <Typography>{row.category}</Typography>
                <Typography weight="bold">{formatCurrency(row.amount, CURRENCY_ILS)}</Typography>
              </Flex>
            ))}
            <Flex justify="between">
              <Typography weight="extrabold" color={COLOR_BLUE}>{t('monthTotal')}</Typography>
              <Typography weight="extrabold" color={COLOR_BLUE}>
                {formatCurrency(expenseSummary.currentMonth, CURRENCY_ILS)}
              </Typography>
            </Flex>
          </Flex>
          <Button variant="ghost" compact disableElevation onClick={() => navigate(ROUTE_EXPENSES)}>
            <Typography color={COLOR_BLUE}>{t('viewAll')}</Typography>
          </Button>
        </Flex>
      </Card>
    );
  }

  return (
    <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_MD}>
        <Typography variant={TYPO_SECTION_TITLE}>{t('monthlyExpenses')}</Typography>
        <EmptyState title={t('noExpenses')} body={t('noExpensesBody')} />
        <Button variant="primary" onClick={() => navigate(ROUTE_EXPENSES)}>
          {t('addExpense')}
        </Button>
      </Flex>
    </Card>
  );
}

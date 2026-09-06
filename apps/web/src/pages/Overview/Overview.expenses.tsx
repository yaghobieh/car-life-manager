import { Card, CardBody, CardHeader, Flex, Typography } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { COLOR_BLUE, CURRENCY_ILS, FLEX_GAP_SM } from '@const';
import { EmptyState } from '@components/EmptyState';
import type { OverviewExpensesProps } from './Overview.types';
import { hasExpenseData } from './Overview.utils';

export function OverviewExpenses(props: OverviewExpensesProps) {
  const { expenseSummary } = props;
  const t = useTranslate();
  const { formatCurrency } = useLingoFormat();

  if (hasExpenseData(expenseSummary)) {
    return (
      <Card variant="elevated" padding="lg">
        <CardHeader title={t('monthlyExpenses')} />
        <CardBody>
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
        </CardBody>
      </Card>
    );
  }

  return (
    <Card variant="elevated" padding="lg">
      <CardHeader title={t('monthlyExpenses')} />
      <CardBody>
        <EmptyState title={t('noExpenses')} body={t('noExpensesBody')} />
      </CardBody>
    </Card>
  );
}

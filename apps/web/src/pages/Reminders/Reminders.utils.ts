import { DATE_SLICE_LENGTH, EMPTY_STRING } from '@const';

export function todayInputDate(): string {
  return new Date().toISOString().slice(0, DATE_SLICE_LENGTH);
}

export function formatDisplayDate(value: string, locale: string): string {
  if (!value) return EMPTY_STRING;
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale).format(date);
}

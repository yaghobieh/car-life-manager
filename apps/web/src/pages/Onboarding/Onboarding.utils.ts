import { DATE_SLICE_LENGTH } from '@const';

export function sliceDate(value: string | null | undefined, unknownLabel: string): string {
  return value?.slice(0, DATE_SLICE_LENGTH) ?? unknownLabel;
}

export function lookupTitle(make: string | null, model: string | null, year: number | null, unknownLabel: string): string {
  return [make, model, year].filter(Boolean).join(' · ') || unknownLabel;
}

const DIGITS = /[^\d]/g;

export function normalizeRegistrationNumber(input: string): string {
  return input.replace(DIGITS, "");
}

export function isValidRegistrationNumber(input: string): boolean {
  const digits = normalizeRegistrationNumber(input);
  return digits.length >= 7 && digits.length <= 8;
}

export function formatRegistrationNumber(input: string): string {
  const digits = normalizeRegistrationNumber(input);
  if (digits.length === 7) {
    return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
  }
  if (digits.length === 8) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
  }
  return digits;
}

export function registrationLookupKey(input: string): number {
  return Number(normalizeRegistrationNumber(input));
}

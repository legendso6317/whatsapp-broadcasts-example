import type { CSVRow } from '@/types';

export function parseCSV(csvText: string): CSVRow[] {
  const lines = csvText.trim().split('\n');
  const rows: CSVRow[] = [];

  for (const line of lines) {
    // Simple CSV parsing (doesn't handle quoted commas, but good enough for MVP)
    const values = line.split(',').map(v => v.trim());

    if (values.length < 1) continue;

    const phoneNumber = values[0];

    // Skip header rows (those that start with "phone", "param", or other non-numeric values)
    if (phoneNumber.toLowerCase() === 'phone' || phoneNumber.toLowerCase().startsWith('param')) {
      continue;
    }

    const params = values.slice(1);

    rows.push({
      phoneNumber,
      params,
    });
  }

  return rows;
}

export function validatePhoneNumber(phone: string): boolean {
  // Remove common formatting characters
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');

  // Should start with + and have 10-15 digits
  return /^\+?\d{10,15}$/.test(cleaned);
}

export function normalizePhoneNumber(phone: string): string {
  // Remove common formatting characters
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');

  // Add + if not present
  if (!cleaned.startsWith('+')) {
    cleaned = '+' + cleaned;
  }

  return cleaned;
}

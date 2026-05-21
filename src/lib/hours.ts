import type { BusinessHours, HoursRange } from '@/data/locations';

const DAY_KEYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

type DayKey = (typeof DAY_KEYS)[number];

function partsInTimezone(date: Date, timezone: string) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
  const parts = fmt.formatToParts(date);
  const weekday = (parts.find((p) => p.type === 'weekday')?.value ?? 'Monday').toLowerCase() as DayKey;
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0');
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');
  return { weekday, hour, minute };
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

export interface OpenStatus {
  open: boolean;
  message: string;
  nextChangeAt?: string;
}

export function getOpenStatus(
  hours: BusinessHours,
  timezone: string,
  now: Date = new Date(),
): OpenStatus {
  const { weekday, hour, minute } = partsInTimezone(now, timezone);
  const today = hours[weekday];
  const nowMin = hour * 60 + minute;

  if (today === 'closed') {
    return { open: false, message: 'Closed today' };
  }
  const range = today as HoursRange;
  const open = toMinutes(range.open);
  const close = toMinutes(range.close);

  if (nowMin < open) {
    return { open: false, message: `Opens at ${formatTime(range.open)}`, nextChangeAt: range.open };
  }
  if (nowMin >= close) {
    return { open: false, message: `Closed — opens tomorrow`, nextChangeAt: range.open };
  }
  return { open: true, message: `Open until ${formatTime(range.close)}`, nextChangeAt: range.close };
}

export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const period = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12}${period}` : `${h12}:${String(m).padStart(2, '0')}${period}`;
}

export function formatRange(range: HoursRange | 'closed'): string {
  if (range === 'closed') return 'Closed';
  return `${formatTime(range.open)} – ${formatTime(range.close)}`;
}

export function weekdayLabel(day: DayKey): string {
  return day.charAt(0).toUpperCase() + day.slice(1);
}

export { DAY_KEYS };
export type { DayKey };

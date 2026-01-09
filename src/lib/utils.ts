import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Formats currency based on global standards
 * @param amount Number to format
 * @param currency Currency code (USD, EUR, GBP, JPY, etc.)
 * @param locale User locale (en-US, de-DE, ja-JP, etc.)
 */
export function formatCurrency(
    amount: number,
    currency: string = 'USD',
    locale: string = 'en-US'
) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Formats dates according to global standards
 */
export function formatDate(
    date: Date | string | number,
    pattern: string = 'MMM dd, yyyy',
    timeZone: string = 'UTC'
) {
    const d = new Date(date);
    return formatInTimeZone(d, timeZone, pattern);
}

/**
 * Returns country flag based on currency/region
 */
export function getRegionFlag(countryCode: string) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

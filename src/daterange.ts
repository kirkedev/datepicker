import { take } from "./itertools";

export const UTCDate = (date: Date) => new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

function* DateIterator(start: Date, end?: Date, step = 1): Iterator<Date> {
    const date = UTCDate(start);

    while (end == null || date < end) {
        yield UTCDate(date);
        date.setDate(date.getDate() + step);
    }
}

export class DateRange implements Iterable<Date> {
    private readonly start: Date;
    private readonly end?: Date;

    constructor(start: Date, end?: Date) {
        this.start = UTCDate(start);
        if (end != null) { this.end = UTCDate(end); }
    }

    public [Symbol.iterator] = () => DateIterator(this.start, this.end);
}

export function calendarMonth(month: number, year: number): Iterable<Date> {
    const first = new Date(year, month -  1, 1);
    const sundayBefore = first.setDate(first.getDate() - first.getDay());
    return take(new DateRange(new Date(sundayBefore)), 42);
}

import { startOfDay } from "./lib";

function* DateIterator(start: Date, end?: Date): Iterator<Date> {
    const date = startOfDay(start);

    while (end === undefined || date < end) {
        yield new Date(date);
        date.setDate(date.getDate() + 1);
    }
}

export class DateRange implements Iterable<Date> {
    public constructor(
        private readonly start: Date,
        private readonly end: Date) {}

    public [Symbol.iterator] = () => DateIterator(this.start, this.end);
}

export class DateSequence implements Iterable<Date> {
    public constructor(private readonly start: Date) {}

    public [Symbol.iterator] = () => DateIterator(this.start);

    public slice(from: number, to: number): DateRange {
        const start = new Date(this.start);
        start.setDate(start.getDate() + from);

        const end = new Date(this.start);
        end.setDate(end.getDate() + to);

        return new DateRange(start, end);
    }

    public take = (count: number) => this.slice(0, count);

    public takeUntil = (end: Date) => new DateRange(this.start, end);

    public drop(count: number): DateSequence {
        const start = new Date(this.start);
        start.setDate(start.getDate() + count);
        return new DateSequence(start);
    }

    public dropUntil = (end: Date) => new DateSequence(end);
}

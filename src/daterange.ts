export const startOfDay = (date: Date) => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
};

export function startOfWeek(date: Date) {
    const result = startOfDay(date);
    result.setDate(date.getDate() - date.getDay());
    return result;
}

function* DateIterator(start: Date, end?: Date, step = 1): Iterator<Date> {
    const date = startOfDay(start);

    while (end == null || date < end) {
        yield startOfDay(date);
        date.setDate(date.getDate() + step);
    }
}

export class DateRange implements Iterable<Date> {
    private readonly start: Date;
    private readonly end: Date;

    constructor(start: Date, end: Date) {
        this.start = startOfDay(start);
        this.end = startOfDay(end);
    }

    public [Symbol.iterator] = () => DateIterator(this.start, this.end);
}

export class DateSequence implements Iterable<Date> {
    private readonly start: Date;

    constructor(start: Date) {
        this.start = startOfDay(start);
    }

    public [Symbol.iterator] = () => DateIterator(this.start);

    public slice(from: number, to: number): DateRange {
        const start = new Date(this.start);
        start.setDate(start.getDate() + from);

        const end = new Date(this.start);
        end.setDate(start.getDate() + to);

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

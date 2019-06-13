export const UTCDate = (date: Date) => new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

function* DateIterator(start: Date, end?: Date, step = 1): Iterator<Date> {
    let date = UTCDate(start);

    while (end == null || date < end) {
        yield UTCDate(date);
        date.setDate(date.getDate() + step);
    }
}

export class DateRange implements Iterable<Date> {
    start: Date;
    end?: Date;

    constructor(start: Date, end?: Date) {
        this.start = UTCDate(start);
        if (end != null) this.end = UTCDate(end);
    }

    [Symbol.iterator] = () => DateIterator(this.start, this.end);
}

export class Month extends DateRange {
    constructor(month: number, year: number) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 1);
        super(start, end);
    }
}

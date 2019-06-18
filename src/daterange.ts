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
    private readonly end?: Date;

    constructor(start: Date, end?: Date) {
        this.start = startOfDay(start);
        if (end != null) { this.end = startOfDay(end); }
    }

    public [Symbol.iterator] = () => DateIterator(this.start, this.end);
}

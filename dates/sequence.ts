import { startOfDay } from "./lib";
import { DateRange } from "./range";

class DateIterator implements Iterator<Date> {
    private readonly date: Date;

    public constructor(start: Date) {
        this.date = startOfDay(start);
    }

    public next(): IteratorResult<Date> {
        const { date } = this;
        const result = { value: new Date(date), done: false };
        date.setDate(date.getDate() + 1);
        return result;
    }
}

export class DateSequence implements Iterable<Date> {
    public constructor(private readonly start: Date) {}

    public [Symbol.iterator] = (): Iterator<Date> =>
        new DateIterator(this.start);

    public slice(from: number): DateSequence
    public slice(from: number, to: number): DateRange;
    public slice(from: number, to?: number): Iterable<Date> {
        const start = new Date(this.start);
        start.setDate(start.getDate() + from);
        if (to === undefined) return new DateSequence(start);

        const end = new Date(this.start);
        end.setDate(end.getDate() + to);
        return new DateRange(start, end);
    }

    public take = (count: number): DateRange => this.slice(0, count);
    public drop = (count: number): DateSequence => this.slice(count);
    public takeUntil = (end: Date): DateRange => new DateRange(this.start, end);
    public dropUntil = (start: Date): DateSequence => new DateSequence(start);
}

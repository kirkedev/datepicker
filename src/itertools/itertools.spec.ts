import { DateRange, DateSequence } from "../dates";
import { chunk } from "./chunk";
import { drop, dropUntil, dropWhile } from "./drop";
import { enumerate } from "./enumerate";
import { filter, find } from "./filter";
import { flatMap, map } from "./map";
import { all, some, count, countIf, none, one } from "./reduce";
import { elementAt, first, last, slice } from "./slice";
import { take, takeUntil, takeWhile } from "./take";
import { zip } from "./zip";

test("chunk a date range by size", () => {
    const start = new Date(2019, 5, 1);
    const end = new Date(2019, 5, 11);
    const dates = map(new DateRange(start, end), date => date.getDate());

    const [first, second] = Array.from(chunk(dates, 7));
    expect(first).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(second).toEqual([8, 9, 10]);
});

describe("start an infinite sequence at the next month", () => {
    let dates: DateSequence;

    beforeEach(() => {
        dates = new DateSequence(new Date(2019, 5, 28));
    });

    test("start an infinite sequence at the next month with drop while", () => {
        const date = first(dropWhile(dates, date => date.getMonth() === 5));
        expect(date.getMonth()).toEqual(6);
        expect(date.getDate()).toEqual(1);
    });

    test("start an infinite sequence at the next month with drop until", () => {
        const date = first(dropUntil(dates, date => date.getMonth() === 6));
        expect(date.getMonth()).toEqual(6);
        expect(date.getDate()).toEqual(1);
    });

    test("start an infinite sequence at the next month with slice", () => {
        const date = first(slice(dates, 3));
        expect(date.getMonth()).toEqual(6);
        expect(date.getDate()).toEqual(1);
    });
});

test("drop is finished when there are no remaining elements", () => {
    const dates = new DateSequence(new Date(2019, 5, 28)).take(7);
    expect(first(drop(dates, 10))).toBeUndefined();
});

test("enumerate a date sequence", () => {
    const start = new Date(2019, 5, 1);
    const [index, date] = first(enumerate(new DateSequence(start)));
    expect(index).toBe(0);
    expect(date).toEqual(start);
});

test("make every day Friday", () => {
    const start = new Date(2019, 5, 1);
    const end = new Date(2019, 6, 1);

    const fridays = filter(new DateRange(start, end), date => date.getDay() === 5);
    const dates = map(fridays, date => date.getDate());
    expect(Array.from(dates)).toEqual([7, 14, 21, 28]);
});

test("find the first Saturday in an infinite date sequence", () => {
    const dates = new DateSequence(new Date(2019, 5, 2));
    const saturday = find(dates, date => date.getDay() === 6);
    expect(saturday.getDate()).toEqual(8);
});

test("return undefined when a date isn't found in a range", () => {
    const dates = new DateSequence(new Date(2019, 5, 2)).take(6);
    const saturday = find(dates, date => date.getDay() === 6);
    expect(saturday).toBeUndefined();
});

test("lazily map a date range", () => {
    const start = new Date(2019, 5, 8);
    const end = new Date(2019, 5, 15);
    const dates = map(new DateRange(start, end), date => date.getDate());
    expect(Array.from(dates)).toEqual([8, 9, 10, 11, 12, 13, 14]);
});

test("flat map a nested date range", () => {
    const range = new DateSequence(new Date(2019, 0, 1)).take(10);
    const dates = flatMap(chunk(range, 7), date => date.getDate());
    expect(Array.from(dates)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("count the number of days in a month", () => {
    const start = new Date(2019, 5, 1);
    const end = new Date(2019, 6, 1);
    const june = new DateSequence(start).takeUntil(end);
    expect(count(june)).toEqual(30);
});

test("count the number of Saturdays in a month", () => {
    const start = new Date(2019, 5, 1);
    const end = new Date(2019, 6, 1);
    const june = new DateSequence(start).takeUntil(end);
    expect(countIf(june, date => date.getDay() === 6)).toEqual(5);
});

test("get a slice of an infinite date sequence", () => {
    const sequence = new DateSequence(new Date(2019, 5, 1));
    const range = slice(sequence, 7, 14);
    const dates = map(range, date => date.getDate());
    expect(Array.from(dates)).toEqual([8, 9, 10, 11, 12, 13, 14]);
});

test("get the date at a specific position in a sequence", () => {
    const sequence = new DateSequence(new Date(2019, 5, 1));
    const date = elementAt(sequence, 5);
    expect(date.getDate()).toBe(6);
});

describe("boolean comparison aggregators", () => {
    let dates: Iterable<Date>;

    beforeEach(() => {
        const start = new Date(2019, 5, 1);
        const end = new Date(2019, 6, 1);
        dates = new DateRange(start, end);
    });

    test("all", () => {
        expect(all(dates, date => date.getMonth() === 5)).toBe(true);
        expect(all(dates, date => date.getDay() === 5)).toBe(false);
    });

    test("none", () => {
        expect(none(dates, date => date.getMonth() === 6)).toBe(true);
        expect(none(dates, date => date.getDay() === 6)).toBe(false);
    });

    test("some", () => {
        expect(some(dates, date => date.getDay() === 6)).toBe(true);
        expect(some(dates, date => date.getMonth() === 6)).toBe(false);
    });

    test("one", () => {
        expect(one(dates, date => date.getDate() === 6)).toBe(true);
        expect(one(dates, date => date.getDay() === 6)).toBe(false);
    });
});

describe("get remaining days in a month from an infinite sequence", () => {
    let range: Iterable<Date>;

    beforeEach(() => {
        range = new DateSequence(new Date(2019, 5, 28));
    });

    test("get remaining days in a month from an infinite sequence with take while", () => {
        const dates = Array.from(takeWhile(range, date => date.getMonth() === 5));
        expect(dates.map(date => date.getDate())).toEqual([28, 29, 30]);
    });

    test("get remaining days in a month from an infinite sequence with take until", () => {
        const dates = Array.from(takeUntil(range, date => date.getMonth() === 6));
        expect(dates.map(date => date.getDate())).toEqual([28, 29, 30]);
    });

    test("get remaining days in a month from an infinite sequence with take", () => {
        const dates = Array.from(take(range, 3));
        expect(dates.map(date => date.getDate())).toEqual([28, 29, 30]);
    });
});

test("combine two months into one sequence", () => {
    const jan1 = new Date(2019, 0, 1);
    const jan31 = new Date(2019, 0, 31);
    const feb1 = new Date(2019, 1, 1);

    const january = new DateRange(jan1, feb1);
    const february = new DateSequence(feb1).takeUntil(new Date(2019, 2, 1));

    const merged = zip(january, february);
    expect(first(merged)).toEqual([jan1, feb1]);
    expect(last(merged)).toEqual([jan31, undefined]);
});

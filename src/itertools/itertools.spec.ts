import { DateRange, DateSequence } from "dates";
import { all, some, count, countIf, none, one, sumBy } from "./accumulate";
import { chunk } from "./chunk";
import { drop, dropUntil, dropWhile } from "./drop";
import { enumerate } from "./enumerate";
import { filter, find } from "./filter";
import { flatMap, map } from "./map";
import { elementAt, first, last, slice } from "./slice";
import { take, takeUntil, takeWhile } from "./take";
import { zip } from "./zip";

test("chunk a date range by size", () => {
    const start = new Date(2019, 5, 1);
    const dates = map(new DateSequence(start).take(10), date => date.getDate());

    const [first, second] = Array.from(chunk(dates, 7));
    expect(first).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(second).toEqual([8, 9, 10]);
});

describe("start an infinite sequence at the next month", () => {
    const dates = new DateSequence(new Date(2019, 5, 1));
    let july: Iterable<Date>;

    test("drop dates from the sequence while each date is in the current month", () => {
        july = dropWhile(dates, date => date.getMonth() === 5);
    });

    test("drop dates from the sequence until a date in the next month", () => {
        july = dropUntil(dates, date => date.getMonth() === 6);
    });

    test("drop the next 30 dates from the sequence", () => {
        july = drop(dates, 30);
    });

    afterEach(() => {
        expect(first(july)).toEqual(new Date(2019, 6, 1));
    });
});

test("drop is finished when there are no remaining elements", () => {
    const dates = new DateSequence(new Date(2019, 5, 28)).take(7);
    expect(first(drop(dates, 10))).toBeUndefined();
});

test("enumerate a date sequence", () => {
    const dates = new DateSequence(new Date(2019, 5, 1)).take(3);

    const expected = [
        new Date(2019, 5, 1),
        new Date(2019, 5, 2),
        new Date(2019, 5, 3)
    ];

    for (const [index, date] of enumerate(dates)) {
        expect(date).toEqual(expected[index]);
    }
});

test("make every day Friday 😎", () => {
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
    expect(sumBy(june, date => date.getDay() === 6 ? 1 : 0)).toEqual(5);
});

describe("slice an infinite date sequence by starting and ending offsets", () => {
    const sequence = new DateSequence(new Date(2019, 5, 1));

    test("take the first 7 dates", () => {
        const range = slice(sequence, 0, 7);
        const dates = map(range, date => date.getDate());
        expect(Array.from(dates)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    test("drop the first 7 dates", () => {
        const dates = slice(sequence, 7);
        expect(first(dates)).toEqual(new Date(2019, 5, 8));
    });

    test("drop the first 7 dates and take the next 7 dates", () => {
        const range = slice(sequence, 7, 14);
        const dates = map(range, date => date.getDate());
        expect(Array.from(dates)).toEqual([8, 9, 10, 11, 12, 13, 14]);
    });
});

test("get the date at a specific position in a sequence", () => {
    const sequence = new DateSequence(new Date(2019, 5, 1));
    const date = elementAt(sequence, 5);
    expect(date.getDate()).toBe(6);
});

describe("boolean comparison accumulators", () => {
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
        expect(one(dates, date => date.getMonth() === 6)).toBe(false);
    });
});

describe("get remaining days in a month from an infinite sequence", () => {
    const dates = new DateSequence(new Date(2019, 5, 1));
    let june: Iterable<Date>;

    test("take dates from the sequence while each date is in the current month", () => {
        june = takeWhile(dates, date => date.getMonth() === 5);
    });

    test("take dates from the sequence until a date in the next month", () => {
        june = takeUntil(dates, date => date.getMonth() === 6);
    });

    test("take the next 30 days of the sequence", () => {
        june = take(dates, 30);
    });

    afterEach(() => {
        expect(last(june)).toEqual(new Date(2019, 5, 30));
    });
});

test("combine two months into one sequence", () => {
    const start2019 = new Date(2019, 1, 1);
    const feb2019 = new DateSequence(start2019).takeUntil(new Date(2019, 2, 1));

    const start2020 = new Date(2020, 1, 1);
    const feb2020 = new DateSequence(start2020).takeUntil(new Date(2020, 2, 1));

    const merged = zip(feb2019, feb2020);
    expect(first(merged)).toEqual([start2019, start2020]);
    expect(last(merged)).toEqual([undefined, new Date(2020, 1, 29)]);
});

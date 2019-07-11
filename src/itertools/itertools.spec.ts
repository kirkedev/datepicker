import { DateRange, DateSequence } from "../dates";
import { chunk } from "./chunk";
import { drop, dropUntil, dropWhile } from "./drop";
import { enumerate } from "./enumerate";
import { filter, find } from "./filter";
import { flatMap, map } from "./map";
import { all, some, count, countIf, none, one } from "./reduce";
import { first, last, slice } from "./slice";
import { take, takeUntil, takeWhile } from "./take";
import { zip } from "./zip";

test("chunk a date range by size", () => {
    const start = new Date(2019, 5, 1);
    const end = new Date(2019, 5, 11);
    const [first, second] = Array.from(chunk(new DateRange(start, end), 7));

    expect(first.map(date => date.getDate())).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(second.map(date => date.getDate())).toEqual([8, 9, 10]);
});

test("start an infinite sequence at the next month", () => {
    const dates = new DateSequence(new Date(2019, 5, 28));
    let nextMonth = dropWhile(dates, date => date.getMonth() === 5);
    let theFirst = first(nextMonth);
    expect(theFirst.getMonth()).toEqual(6);
    expect(theFirst.getDate()).toEqual(1);

    nextMonth = dropUntil(dates, date => date.getMonth() === 6);
    theFirst = first(nextMonth);
    expect(theFirst.getMonth()).toEqual(6);
    expect(theFirst.getDate()).toEqual(1);

    nextMonth= drop(dates, 3);
    theFirst = first(nextMonth);
    expect(theFirst.getMonth()).toEqual(6);
    expect(theFirst.getDate()).toEqual(1);
});

test("enumerate a date sequence", () => {
    const start = new Date(2019, 5, 1);
    const dates = enumerate(new DateSequence(start));
    const [index, date] = first(dates);
    expect(index).toBe(0);
    expect(date).toEqual(start);
});

test("make every day Friday", () => {
    const start = new Date(2019, 5, 1);
    const end = new Date(2019, 6, 1);
    const fridays = filter(new DateRange(start, end), date => date.getDay() === 5);
    expect(Array.from(fridays).map(date => date.getDate())).toEqual([7, 14, 21, 28]);
});

test("find the first Saturday in an infinite date sequence", () => {
    const dates = new DateSequence(new Date(2019, 5, 2));
    const saturday = find(dates, date => date.getDay() === 6);
    expect(saturday.getDate()).toEqual(8);
});

test("return undefined when a date isn't found in a sequence", () => {
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

test("slice an infinite date sequence with an iterable", () => {
    const sequence = new DateSequence(new Date(2019, 5, 1));
    const dates = Array.from(map(slice(sequence, 7, 14), date => date.getDate()));
    expect(dates).toEqual([8, 9, 10, 11, 12, 13, 14]);
});

test("boolean comparison aggregators", () => {
    const start = new Date(2019, 5, 1);
    const end = new Date(2019, 6, 1);
    const dates = new DateRange(start, end);

    expect(all(dates, (date => date.getMonth() === 5))).toBe(true);
    expect(some(dates, (date => date.getDay() === 0))).toBe(true);
    expect(one(dates, (date => date.getDate() === 6))).toBe(true);
    expect(none(dates, (date => date.getMonth() === 6))).toBe(true);
    expect(some(dates, (date => date.getMonth() === 6))).toBe(false);
});

test("get remaining days in a month from an infinite sequence", () => {
    const range = new DateSequence(new Date(2019, 5, 28));
    let dates = Array.from(takeWhile(range, date => date.getMonth() === 5));
    expect(dates.map(date => date.getDate())).toEqual([28, 29, 30]);

    dates = Array.from(takeUntil(range, date => date.getMonth() === 6));
    expect(dates.map(date => date.getDate())).toEqual([28, 29, 30]);

    dates = Array.from(take(range, 3));
    expect(dates.map(date => date.getDate())).toEqual([28, 29, 30]);
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

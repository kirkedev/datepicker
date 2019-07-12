import { isSameDate, startOfDay, startOfWeek } from "./lib";
import { DateRange, DateSequence } from "./ranges";

test("truncate a date's time", () => {
    const date = new Date(5, 1, 1, 12, 30, 30, 100);
    const start = startOfDay(date);

    expect(start.getHours()).toEqual(0);
    expect(start.getMinutes()).toEqual(0);
    expect(start.getSeconds()).toEqual(0);
    expect(start.getMilliseconds()).toEqual(0);
    expect(start.getTimezoneOffset()).toEqual(date.getTimezoneOffset());
});

test("find the Sunday prior to a date", () => {
    const date = new Date(2019, 5, 1, 12, 30, 30, 100);
    const start = startOfWeek(date);

    expect(start.getFullYear()).toEqual(2019);
    expect(start.getMonth()).toEqual(4);
    expect(start.getDate()).toEqual(26);
    expect(start.getHours()).toEqual(0);
    expect(start.getMinutes()).toEqual(0);
    expect(start.getSeconds()).toEqual(0);
    expect(start.getMilliseconds()).toEqual(0);
    expect(start.getTimezoneOffset()).toEqual(date.getTimezoneOffset());
});

test("compare two dates ignoring the time", () => {
    const date = new Date(2019, 5, 1, 12, 30, 30, 100);
    const other = new Date(2019, 5, 1);

    expect(isSameDate(date, other)).toBe(true);
    expect(isSameDate(date, new Date())).toBe(false);
});

test("create an infinite sequence of dates starting from a specific date", () => {
    const dates = new DateSequence(new Date(2019, 5, 1));
    const iterator = dates[Symbol.iterator]();

    expect(iterator.next().value.getDate()).toEqual(1);
    expect(iterator.next().value.getDate()).toEqual(2);
    expect(iterator.next().value.getDate()).toEqual(3);
});

test("create an end-exclusive iterable date range between two calendar dates", () => {
    const start = new Date(2019, 5, 1);
    const end = new Date(2019, 5, 8);
    const dates = Array.from(new DateRange(start, end)).map(date => date.getDate());
    expect(dates).toEqual([1, 2, 3, 4, 5, 6, 7]);
});

test("convert a sequence of dates to a finite range from a beginning and ending position", () => {
    const start = new Date(2019, 5, 1);
    const range = new DateSequence(start).slice(7, 14);
    const dates = Array.from(range).map(date => date.getDate());
    expect(dates).toEqual([8, 9, 10, 11, 12, 13, 14]);
});

test("terminate a sequence of dates after the next seven dates", () => {
    const range = new DateSequence(new Date(2019, 5, 1)).take(7);
    const dates = Array.from(range).map(date => date.getDate());
    expect(dates).toEqual([1, 2, 3, 4, 5, 6, 7]);
});

test("terminate a date sequence at the beginning of the next month", () => {
    const start = new Date(2019, 5, 1);
    const end = new Date(2019, 6, 1);
    const range = new DateSequence(start).takeUntil(end);
    const dates = Array.from(range).map(date => date.getDate());
    expect(dates[dates.length - 1]).toEqual(30);
});

test("skip the next 7 days of a date sequence", () => {
    const start = new Date(2019, 5, 1);
    const dates = new DateSequence(start).drop(7);
    const iterator = dates[Symbol.iterator]();

    expect(iterator.next().value.getDate()).toEqual(8);
    expect(iterator.next().value.getDate()).toEqual(9);
    expect(iterator.next().value.getDate()).toEqual(10);
});

test("skip to the next month of a date sequence", () => {
    const start = new Date(2019, 5, 1);
    const dates = new DateSequence(start).dropUntil(new Date(2019, 6, 1));
    const iterator = dates[Symbol.iterator]();
    const next = iterator.next().value;

    expect(next.getMonth()).toEqual(6);
    expect(next.getDate()).toEqual(1);
});

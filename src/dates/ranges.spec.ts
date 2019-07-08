import { chunk } from "itertools/chunk";
import { dropUntil, dropWhile } from "itertools/drop";
import { find } from "itertools/filter";
import { map } from "itertools/map";
import { partition } from "itertools/partition";
import { countIf } from "itertools/reduce";
import { first, last } from "itertools/slice";
import { takeUntil, takeWhile } from "itertools/take";
import { DateRange, DateSequence } from "./ranges";

test("create an end-exclusive iterable date range between two calendar", () => {
    const start = new Date(2019, 5, 1);
    const end = new Date(2019, 5, 8);
    const dates = Array.from(new DateRange(start, end)).map((date) => date.getDate());

    expect(dates).toEqual([1, 2, 3, 4, 5, 6, 7]);
});

test("lazily map a date range", () => {
    const start = new Date(2019, 5, 8);
    const end = new Date(2019, 5, 15);
    const dates = map(new DateRange(start, end), (date) => date.getDay());

    expect(Array.from(dates)).toEqual([6, 0, 1, 2, 3, 4, 5]);
});

test("partition a date range by month", () => {
    const start = new Date(2019, 4, 29);
    const end = new Date(2019, 5, 4);

    const [may, june] = Array.from(partition(new DateRange(start, end), (date) => date.getMonth()));
    expect(may.map((date) => date.getDate())).toEqual([29, 30, 31]);
    expect(june.map((date) => date.getDate())).toEqual([1, 2, 3]);
});

test("chunk a date range by size", () => {
    const start = new Date(2019, 5, 1);
    const end = new Date(2019, 5, 11);

    const [first, second] = Array.from(chunk(new DateRange(start, end), 7));
    expect(first.map((date) => date.getDate())).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(second.map((date) => date.getDate())).toEqual([8, 9, 10]);
});

test("get remaining days in a month from an infinite sequence", () => {
    const range = new DateSequence(new Date(2019, 5, 28));

    let dates = Array.from(takeWhile(range, (date) => date.getMonth() === 5));
    expect(dates.map((date) => date.getDate())).toEqual([28, 29, 30]);

    dates = Array.from(takeUntil(range, (date) => date.getMonth() === 6));
    expect(dates.map((date) => date.getDate())).toEqual([28, 29, 30]);
});

test("start an infinite sequence at the next month", () => {
    const dates = new DateSequence(new Date(2019, 5, 28));

    let nextMonth = dropWhile(dates, (date) => date.getMonth() === 5);
    let firstOfTheMonth = first(nextMonth);
    expect(firstOfTheMonth.getMonth()).toEqual(6);
    expect(firstOfTheMonth.getDate()).toEqual(1);

    nextMonth = dropUntil(dates, (date) => date.getMonth() === 6);
    firstOfTheMonth = first(nextMonth);
    expect(firstOfTheMonth.getMonth()).toEqual(6);
    expect(firstOfTheMonth.getDate()).toEqual(1);
});

test("slice a date sequence", () => {
   const range = new DateSequence(new Date(2019, 5, 1)).slice(7, 14);
   const dates = map(range, (date) => date.getDate());
   expect(Array.from(dates)).toEqual([8, 9, 10, 11, 12, 13, 14]);
});

test("convert a date sequence to a sized range", () => {
    const range = new DateSequence(new Date(2019, 5, 1)).take(7);
    const dates = map(range, (date) => date.getDate());
    expect(Array.from(dates)).toEqual([1, 2, 3, 4, 5, 6, 7]);
});

test("terminate a date sequence at the beginning of the next month", () => {
    const range = new DateSequence(new Date(2019, 5, 1))
        .takeUntil(new Date(2019, 6, 1));

    const dates = map(range, (date) => date.getDate());
    expect(last(dates)).toEqual(30);
});

test("find the first Saturday in an infinite date sequence", () => {
    const dates = new DateSequence(new Date(2019, 5, 2));
    const saturday = find(dates, (date) => date.getDay() === 6);
    expect(saturday.getDate()).toEqual(8);
});

test("count the number of Saturdays in a month", () => {
    const start = new Date(2019,  5, 1);
    const end = new Date(2019, 6, 1);
    const june = new DateSequence(start).takeUntil(end);
    expect(countIf(june, (date) => date.getDay() === 6)).toEqual(5);
});
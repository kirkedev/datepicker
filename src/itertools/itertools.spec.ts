import {map} from "./map";
import {DateRange, DateSequence} from "../dates";
import {chunk} from "./chunk";
import {dropUntil, dropWhile} from "./drop";
import {first} from "./slice";
import {takeUntil, takeWhile} from "./take";
import {find} from "./filter";
import {countIf} from "./reduce";

test("lazily map a date range", () => {
    const start = new Date(2019, 5, 8);
    const end = new Date(2019, 5, 15);
    const dates = map(new DateRange(start, end), date => date.getDate());

    expect(Array.from(dates)).toEqual([8, 9, 10, 11, 12, 13, 14]);
});

test("chunk a date range by size", () => {
    const start = new Date(2019, 5, 1);
    const end = new Date(2019, 5, 11);
    const [first, second] = Array.from(chunk(new DateRange(start, end), 7));

    expect(first.map(date => date.getDate())).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(second.map(date => date.getDate())).toEqual([8, 9, 10]);
});

test("get remaining days in a month from an infinite sequence", () => {
    const range = new DateSequence(new Date(2019, 5, 28));

    let dates = Array.from(takeWhile(range, date => date.getMonth() === 5));
    expect(dates.map(date => date.getDate())).toEqual([28, 29, 30]);

    dates = Array.from(takeUntil(range, date => date.getMonth() === 6));
    expect(dates.map(date => date.getDate())).toEqual([28, 29, 30]);
});

test("start an infinite sequence at the next month", () => {
    const dates = new DateSequence(new Date(2019, 5, 28));

    let nextMonth = dropWhile(dates, date => date.getMonth() === 5);
    let firstOfTheMonth = first(nextMonth);
    expect(firstOfTheMonth.getMonth()).toEqual(6);
    expect(firstOfTheMonth.getDate()).toEqual(1);

    nextMonth = dropUntil(dates, date => date.getMonth() === 6);
    firstOfTheMonth = first(nextMonth);
    expect(firstOfTheMonth.getMonth()).toEqual(6);
    expect(firstOfTheMonth.getDate()).toEqual(1);
});

test("find the first Saturday in an infinite date sequence", () => {
    const dates = new DateSequence(new Date(2019, 5, 2));
    const saturday = find(dates, date => date.getDay() === 6);
    expect(saturday.getDate()).toEqual(8);
});

test("count the number of Saturdays in a month", () => {
    const start = new Date(2019, 5, 1);
    const end = new Date(2019, 6, 1);
    const june = new DateSequence(start).takeUntil(end);
    expect(countIf(june, date => date.getDay() === 6)).toEqual(5);
});

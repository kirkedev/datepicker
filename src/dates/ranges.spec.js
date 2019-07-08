import * as tslib_1 from "tslib";
import { chunk } from "itertools/chunk";
import { dropUntil, dropWhile } from "itertools/drop";
import { find } from "itertools/filter";
import { map } from "itertools/map";
import { partition } from "itertools/partition";
import { countIf } from "itertools/reduce";
import { first, last } from "itertools/slice";
import { takeUntil, takeWhile } from "itertools/take";
import { DateRange, DateSequence } from "./ranges";
test("create an end-exclusive iterable date range between two calendar", function () {
    var start = new Date(2019, 5, 1);
    var end = new Date(2019, 5, 8);
    var dates = Array.from(new DateRange(start, end)).map(function (date) { return date.getDate(); });
    expect(dates).toEqual([1, 2, 3, 4, 5, 6, 7]);
});
test("lazily map a date range", function () {
    var start = new Date(2019, 5, 8);
    var end = new Date(2019, 5, 15);
    var dates = map(new DateRange(start, end), function (date) { return date.getDay(); });
    expect(Array.from(dates)).toEqual([6, 0, 1, 2, 3, 4, 5]);
});
test("partition a date range by month", function () {
    var start = new Date(2019, 4, 29);
    var end = new Date(2019, 5, 4);
    var _a = tslib_1.__read(Array.from(partition(new DateRange(start, end), function (date) { return date.getMonth(); })), 2), may = _a[0], june = _a[1];
    expect(may.map(function (date) { return date.getDate(); })).toEqual([29, 30, 31]);
    expect(june.map(function (date) { return date.getDate(); })).toEqual([1, 2, 3]);
});
test("chunk a date range by size", function () {
    var start = new Date(2019, 5, 1);
    var end = new Date(2019, 5, 11);
    var _a = tslib_1.__read(Array.from(chunk(new DateRange(start, end), 7)), 2), first = _a[0], second = _a[1];
    expect(first.map(function (date) { return date.getDate(); })).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(second.map(function (date) { return date.getDate(); })).toEqual([8, 9, 10]);
});
test("get remaining days in a month from an infinite sequence", function () {
    var range = new DateSequence(new Date(2019, 5, 28));
    var dates = Array.from(takeWhile(range, function (date) { return date.getMonth() === 5; }));
    expect(dates.map(function (date) { return date.getDate(); })).toEqual([28, 29, 30]);
    dates = Array.from(takeUntil(range, function (date) { return date.getMonth() === 6; }));
    expect(dates.map(function (date) { return date.getDate(); })).toEqual([28, 29, 30]);
});
test("start an infinite sequence at the next month", function () {
    var dates = new DateSequence(new Date(2019, 5, 28));
    var nextMonth = dropWhile(dates, function (date) { return date.getMonth() === 5; });
    var firstOfTheMonth = first(nextMonth);
    expect(firstOfTheMonth.getMonth()).toEqual(6);
    expect(firstOfTheMonth.getDate()).toEqual(1);
    nextMonth = dropUntil(dates, function (date) { return date.getMonth() === 6; });
    firstOfTheMonth = first(nextMonth);
    expect(firstOfTheMonth.getMonth()).toEqual(6);
    expect(firstOfTheMonth.getDate()).toEqual(1);
});
test("slice a date sequence", function () {
    var range = new DateSequence(new Date(2019, 5, 1)).slice(7, 14);
    var dates = map(range, function (date) { return date.getDate(); });
    expect(Array.from(dates)).toEqual([8, 9, 10, 11, 12, 13, 14]);
});
test("convert a date sequence to a sized range", function () {
    var range = new DateSequence(new Date(2019, 5, 1)).take(7);
    var dates = map(range, function (date) { return date.getDate(); });
    expect(Array.from(dates)).toEqual([1, 2, 3, 4, 5, 6, 7]);
});
test("terminate a date sequence at the beginning of the next month", function () {
    var range = new DateSequence(new Date(2019, 5, 1)).takeUntil(new Date(2019, 6, 1));
    var dates = map(range, function (date) { return date.getDate(); });
    expect(last(dates)).toEqual(30);
});
test("find the first Saturday in an infinite date sequence", function () {
    var dates = new DateSequence(new Date(2019, 5, 2));
    var saturday = find(dates, function (date) { return date.getDay() === 6; });
    expect(saturday.getDate()).toEqual(8);
});
test("count the number of Saturdays in a month", function () {
    var start = new Date(2019, 5, 1);
    var end = new Date(2019, 6, 1);
    var june = new DateSequence(start).takeUntil(end);
    expect(countIf(june, function (date) { return date.getDay() === 6; })).toEqual(5);
});

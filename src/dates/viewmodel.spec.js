import { all, find, flatten, map, none } from "itertools";
import { startOfDay, DatePickerViewModel } from "dates";
test("create formatted calendar for a calendar month", function () {
    var datePicker = new DatePickerViewModel(6, 2019);
    var dates = map(datePicker.dates, function (week) {
        return Array.from(week).map(function (_a) {
            var date = _a.date;
            return date.getDate();
        });
    });
    expect(Array.from(dates)).toEqual([
        [26, 27, 28, 29, 30, 31, 1],
        [2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22],
        [23, 24, 25, 26, 27, 28, 29],
        [30, 1, 2, 3, 4, 5, 6],
    ]);
});
test("create formatted calendar for the previousMonth calendar month", function () {
    var datePicker = new DatePickerViewModel(6, 2019);
    var dates = map(datePicker.previous().dates, function (week) {
        return Array.from(week).map(function (_a) {
            var date = _a.date;
            return date.getDate();
        });
    });
    expect(Array.from(dates)).toEqual([
        [28, 29, 30, 1, 2, 3, 4],
        [5, 6, 7, 8, 9, 10, 11],
        [12, 13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30, 31, 1],
        [2, 3, 4, 5, 6, 7, 8],
    ]);
});
test("create formatted calendar for the nextMonth calendar month", function () {
    var datePicker = new DatePickerViewModel(6, 2019);
    var dates = map(datePicker.next().dates, function (week) {
        return Array.from(week).map(function (_a) {
            var date = _a.date;
            return date.getDate();
        });
    });
    expect(Array.from(dates)).toEqual([
        [30, 1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12, 13],
        [14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27],
        [28, 29, 30, 31, 1, 2, 3],
        [4, 5, 6, 7, 8, 9, 10],
    ]);
});
test("select a date", function () {
    var date = new Date(2019, 5, 6);
    var datePicker = new DatePickerViewModel(6, 2019).select(date);
    var selected = find(flatten(datePicker.dates), function (day) { return day.isSelected; });
    expect(selected.date.getDate()).toEqual(6);
});
test("highlight today", function () {
    var today = startOfDay(new Date());
    var datePicker = new DatePickerViewModel(today.getMonth() + 1, today.getFullYear());
    var date = find(flatten(datePicker.dates), function (day) { return day.isToday; });
    expect(date.date).toEqual(today);
});
test("display formatted calendar title", function () {
    var datePicker = new DatePickerViewModel(6, 2019);
    expect(datePicker.title).toEqual("June 2019");
});
test("mark days in the active month", function () {
    var datePicker = new DatePickerViewModel(6, 2019);
    var dates = Array.from(flatten(datePicker.dates));
    expect(none(dates.slice(0, 6), function (date) { return date.isActiveMonth; })).toBe(true);
    expect(all(dates.slice(6, 36), function (date) { return date.isActiveMonth; })).toBe(true);
    expect(none(dates.slice(36), function (date) { return date.isActiveMonth; })).toBe(true);
});

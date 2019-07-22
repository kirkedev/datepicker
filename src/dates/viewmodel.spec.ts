import { find, flatten } from "itertools";
import { startOfDay, DatePickerViewModel } from "dates";
import { months } from "./viewmodel";

test("create formatted calendar for a calendar month", () => {
    const datepicker = new DatePickerViewModel(6, 2019);
    const dates = Array.from(datepicker.dates).map(week =>
        Array.from(week).map(({ date }) => date.getDate()));

    expect(dates).toEqual([
        [26, 27, 28, 29, 30, 31, 1],
        [2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22],
        [23, 24, 25, 26, 27, 28, 29],
        [30, 1, 2, 3, 4, 5, 6],
    ]);
});

test("create formatted calendar for the previous calendar month", () => {
    const previous = new DatePickerViewModel(6, 2019).previous().dates;
    const dates = Array.from(previous).map(week =>
        Array.from(week).map(({ date }) => date.getDate()));

    expect(dates).toEqual([
        [28, 29, 30, 1, 2, 3, 4],
        [5, 6, 7, 8, 9, 10, 11],
        [12, 13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30, 31, 1],
        [2, 3, 4, 5, 6, 7, 8],
    ]);
});

test("create formatted calendar for the next calendar month", () => {
    const next = new DatePickerViewModel(6, 2019).next().dates;
    const dates = Array.from(next).map(week =>
        Array.from(week).map(({ date }) => date.getDate()));

    expect(dates).toEqual([
        [30, 1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12, 13],
        [14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27],
        [28, 29, 30, 31, 1, 2, 3],
        [4, 5, 6, 7, 8, 9, 10],
    ]);
});

test("select a date", () => {
    const date = new Date(2019, 5, 6);
    const datepicker = new DatePickerViewModel(6, 2019).select(date);
    const selected = find(flatten(datepicker.dates), day => day.isSelected);
    expect(selected.date.getDate()).toEqual(6);
});

test("highlight today", () => {
    const today = startOfDay(new Date());
    const datepicker = new DatePickerViewModel(today.getMonth() + 1, today.getFullYear());
    const day = find(flatten(datepicker.dates), day => day.isToday);
    expect(day.date).toEqual(today);
});

test("display formatted calendar title", () => {
    const datepicker = new DatePickerViewModel(6, 2019);
    expect(datepicker.title).toEqual("June 2019");
});

test("mark days in the active month", () => {
    const datepicker = new DatePickerViewModel(6, 2019);
    const dates = Array.from(flatten(datepicker.dates));
    expect(dates.slice(0, 6).some(date => date.isActiveMonth)).toBe(false);
    expect(dates.slice(6, 36).every(date => date.isActiveMonth)).toBe(true);
    expect(dates.slice(36).some(date => date.isActiveMonth)).toBe(false);
});

test("previous month should cycle to December of prior year from January", () => {
    const datepicker = new DatePickerViewModel(1, 2019).previous();
    expect(datepicker.title).toEqual("December 2018");
});

test("next month should cycle to January of following year from December", () => {
    const datepicker = new DatePickerViewModel(12, 2018).next();
    expect(datepicker.title).toEqual("January 2019");
});

test("default datepicker should show current date and month", () => {
    const datepicker = new DatePickerViewModel();
    const today = new Date();
    expect(datepicker.title).toEqual(`${months[today.getMonth()]} ${today.getFullYear()}`);
});

import { find, flatten, one } from "itertools";
import { startOfDay } from "./lib";
import { DatePickerViewModel, DateViewModel } from "./viewmodel";

test("DateViewModel classes", () => {
    const date = new DateViewModel({
        date: new Date(),
        isToday: true,
        isActiveMonth: true,
        isSelected: false
    });

    expect(date.className).toEqual("date today active")
});

test("display formatted calendar dates", () => {
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

test("display formatted calendar title", () => {
    const datepicker = new DatePickerViewModel(6, 2019);
    expect(datepicker.title).toEqual("June 2019");
});

test("highlight selected date", () => {
    const date = new Date(2019, 5, 6);
    const datepicker = new DatePickerViewModel(6, 2019, date);
    const dates = flatten(datepicker.dates);
    const selected = find(dates, day => day.isSelected);

    expect(one(dates, day => day.isSelected)).toBe(true);
    expect(selected.date).toEqual(date);
    expect(selected.className).toMatch(/\bselected\b/);
});

test("highlight today", () => {
    const datepicker = new DatePickerViewModel();
    const dates = flatten(datepicker.dates);
    const today = find(dates, day => day.isToday);

    expect(one(dates, day => day.isToday)).toBe(true);
    expect(today.date).toEqual(startOfDay(new Date()));
    expect(today.className).toMatch(/\btoday\b/);
});

describe("highlight days in the active month", () => {
    const isActiveMonth = (date: DateViewModel): boolean => date.isActiveMonth;
    const hasActiveClass = (date: DateViewModel): boolean => /\bactive\b/.test(date.className);

    const datepicker = new DatePickerViewModel(6, 2019);
    const dates = Array.from(flatten(datepicker.dates));

    it("should not highlight any dates in May", () => {
        const may = dates.slice(0, 6);
        expect(may.some(isActiveMonth)).toBe(false);
        expect(may.some(hasActiveClass)).toBe(false);
    });

    it("should highlight all dates in June", () => {
        const june = dates.slice(6, 36);
        expect(june.every(isActiveMonth)).toBe(true);
        expect(june.every(hasActiveClass)).toBe(true);
    });

    it("should not highlight any dates in July", () => {
        const july = dates.slice(36);
        expect(july.some(isActiveMonth)).toBe(false);
        expect(july.some(hasActiveClass)).toBe(false);
    });
});

import { startOfDay } from "dates";
import { find, flatten, one } from "itertools";
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
    const model = new DatePickerViewModel(6, 2019, date);
    expect(one(flatten(model.dates), day => day.isSelected)).toBe(true);

    const selected = find(flatten(model.dates), day => day.isSelected);
    expect(selected.date).toEqual(date);
    expect(selected.className).toContain("selected");
});

test("highlight today", () => {
    const today = startOfDay(new Date());
    const datepicker = new DatePickerViewModel();
    expect(one(flatten(datepicker.dates), day => day.isToday)).toBe(true);

    const day = find(flatten(datepicker.dates), day => day.isToday);
    expect(day.date).toEqual(today);
    expect(day.className).toContain("today");
});

test("highlight days in the active month", () => {
    const datepicker = new DatePickerViewModel(6, 2019);
    const dates = Array.from(flatten(datepicker.dates));

    const may = dates.slice(0, 6);
    expect(may.some(date => date.isActiveMonth)).toBe(false);
    expect(may.some(date => date.className.includes("active"))).toBe(false);

    const june = dates.slice(6, 36);
    expect(june.every(date => date.isActiveMonth)).toBe(true);
    expect(june.every(date => date.className.includes("active"))).toBe(true);

    const july = dates.slice(36);
    expect(july.some(date => date.isActiveMonth)).toBe(false);
    expect(july.some(date => date.className.includes("active"))).toBe(false);
});

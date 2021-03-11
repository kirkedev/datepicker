import { find, flatten } from "itertools";
import { startOfDay } from "dates";
import DateViewModel from "./DateViewModel";
import DatePickerViewModel from "./DatePickerViewModel";

test("combine date states into a class name", () => {
    const date = DateViewModel.from({
        date: new Date(),
        isSelected: false,
        isToday: true,
        isActive: true
    });

    expect(date.className).toEqual("date today active");
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
        [30, 1, 2, 3, 4, 5, 6]
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
    const selected = find(dates, day => /\bselected\b/.test(day.className));
    expect(selected.date).toEqual(date);
});

test("highlight today", () => {
    const datepicker = new DatePickerViewModel();
    const dates = flatten(datepicker.dates);
    const today = find(dates, day => /\btoday\b/.test(day.className));
    expect(today.date).toEqual(startOfDay(new Date()));
});

describe("highlight days in the active month", () => {
    const isActiveMonth = (date: DateViewModel): boolean => /\bactive\b/.test(date.className);

    const datepicker = new DatePickerViewModel(6, 2019);
    const dates = Array.from(flatten(datepicker.dates));

    it("should not highlight any dates in May", () => {
        const may = dates.slice(0, 6);
        expect(may.some(isActiveMonth)).toBe(false);
    });

    it("should highlight all dates in June", () => {
        const june = dates.slice(6, 36);
        expect(june.every(isActiveMonth)).toBe(true);
    });

    it("should not highlight any dates in July", () => {
        const july = dates.slice(36);
        expect(july.some(isActiveMonth)).toBe(false);
    });
});

import { reducer, previousMonth, nextMonth, selectDate } from "./reducer";
import { DatePickerViewModel } from "./viewmodel";

test("go to previous month", () => {
    const model = reducer(new DatePickerViewModel(1, 2019), previousMonth());
    const dates = Array.from(model.dates).map(dates =>
        Array.from(dates).map(({ date }) => date.getDate()));

    expect(dates).toEqual([
        [25, 26, 27, 28, 29, 30, 1],
        [2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22],
        [23, 24, 25, 26, 27, 28, 29],
        [30, 31, 1, 2, 3, 4, 5]
    ]);

    expect(model.title).toEqual("December 2018");
});

test("go to next month", () => {
    const model = reducer(new DatePickerViewModel(12, 2018), nextMonth());
    const dates = Array.from(model.dates).map(dates =>
        Array.from(dates).map(({ date }) => date.getDate()));

    expect(dates).toEqual([
        [30, 31, 1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24, 25, 26],
        [27, 28, 29, 30, 31, 1, 2],
        [3, 4, 5, 6, 7, 8, 9]
    ]);

    expect(model.title).toEqual("January 2019");
});

test("select a date", () => {
    const date = new Date(2018, 12, 25);
    const model = reducer(new DatePickerViewModel(12, 2018), selectDate(date));
    expect(model.selected).toEqual(date);
});

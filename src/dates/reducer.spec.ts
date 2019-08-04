import { reducer, previousMonth, nextMonth, selectDate } from "./reducer";
import { DatePickerViewModel } from "./viewmodel";

test("go to previous calendar month", () => {
    const model = reducer(new DatePickerViewModel(6, 2019), previousMonth());
    expect(model.month).toBe(5);
    expect(model.year).toBe(2019);

    const dates = Array.from(model.dates).map(week =>
        Array.from(week).map(({ date }) => date.getDate()));

    expect(dates).toEqual([
        [28, 29, 30, 1, 2, 3, 4],
        [5, 6, 7, 8, 9, 10, 11],
        [12, 13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30, 31, 1],
        [2, 3, 4, 5, 6, 7, 8],
    ]);

    expect(model.title).toEqual("May 2019");
});

test("go to next calendar month", () => {
    const model = reducer(new DatePickerViewModel(6, 2019), nextMonth());
    expect(model.month).toBe(7);
    expect(model.year).toBe(2019);

    const dates = Array.from(model.dates).map(week =>
        Array.from(week).map(({ date }) => date.getDate()));

    expect(dates).toEqual([
        [30, 1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12, 13],
        [14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27],
        [28, 29, 30, 31, 1, 2, 3],
        [4, 5, 6, 7, 8, 9, 10],
    ]);

    expect(model.title).toEqual("July 2019");
});

test("go to previous month from January", () => {
    const model = reducer(new DatePickerViewModel(1, 2019), previousMonth());
    expect(model.month).toBe(12);
    expect(model.year).toBe(2018)
});

test("go to next month from December", () => {
    const model = reducer(new DatePickerViewModel(12, 2018), nextMonth());
    expect(model.month).toBe(1);
    expect(model.year).toBe(2019)
});

test("select a date", () => {
    const date = new Date(2019, 5, 6);
    const model = reducer(new DatePickerViewModel(6, 2019), selectDate(date));
    expect(model.selected).toEqual(date);
});

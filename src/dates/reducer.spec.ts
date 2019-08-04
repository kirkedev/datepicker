import { reducer, previousMonth, nextMonth, selectDate } from "./reducer";
import { DatePickerViewModel } from "./viewmodel";

test("go to previous calendar month", () => {
    const model = reducer(new DatePickerViewModel(6, 2019), previousMonth());
    expect(model.month).toBe(5);
    expect(model.year).toBe(2019);
});

test("go to next calendar month", () => {
    const model = reducer(new DatePickerViewModel(6, 2019), nextMonth());
    expect(model.month).toBe(7);
    expect(model.year).toBe(2019);
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

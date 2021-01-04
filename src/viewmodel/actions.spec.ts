import { DatePickerViewModel } from "./viewmodel";
import { previousMonth, nextMonth, selectDate } from "./actions";

test("go to previous calendar month", () => {
    const state = previousMonth(new DatePickerViewModel(6, 2019));
    expect(state.month).toBe(5);
    expect(state.year).toBe(2019);
    expect(state.selected).toBeUndefined();
});

test("go to next calendar month", () => {
    const selected = new Date(2019, 5, 6);
    const state = nextMonth(new DatePickerViewModel(6, 2019, selected));
    expect(state.month).toBe(7);
    expect(state.year).toBe(2019);
    expect(state.selected).toEqual(selected);
});

test("go to previous month from January", () => {
    const state = previousMonth(new DatePickerViewModel(1, 2019));
    expect(state.month).toBe(12);
    expect(state.year).toBe(2018);
    expect(state.selected).toBeUndefined();
});

test("go to next month from December", () => {
    const state = nextMonth(new DatePickerViewModel(12, 2018));
    expect(state.month).toBe(1);
    expect(state.year).toBe(2019);
    expect(state.selected).toBeUndefined();
});

test("select a date", () => {
    const date = new Date(2019, 5, 6);
    const state = selectDate(date)(new DatePickerViewModel(6, 2019));
    expect(state.month).toBe(6);
    expect(state.year).toBe(2019);
    expect(state.selected).toEqual(date);
});

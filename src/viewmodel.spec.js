import DatePickerViewModel from "./viewmodel";
import { map, none, all, slice } from './itertools';

test('create formatted dates for a calendar month', () => {
    const datePicker = new DatePickerViewModel(6, 2019);
    const dates = map(datePicker.dates, week => Array.from(week).map(({ date }) => date));

    expect(Array.from(dates)).toEqual([
        [26, 27, 28, 29, 30, 31,  1],
        [ 2,  3,  4,  5,  6,  7,  8],
        [ 9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22],
        [23, 24, 25, 26, 27, 28, 29],
        [30,  1,  2,  3,  4,  5,  6]
    ]);
});

test('create formatted dates for the previous calendar month', () => {
    const datePicker = new DatePickerViewModel(6, 2019);
    const dates = map(datePicker.previous().dates, week => Array.from(week).map(({ date }) => date));

    expect(Array.from(dates)).toEqual([
        [28, 29, 30,  1,  2,  3,  4],
        [ 5,  6,  7,  8,  9, 10, 11],
        [12, 13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30, 31,  1],
        [ 2,  3,  4,  5,  6,  7,  8],
    ]);
});

test('create formatted dates for the next calendar month', () => {
    const datePicker = new DatePickerViewModel(6, 2019);
    const dates = map(datePicker.next().dates, week => Array.from(week).map(({ date }) => date));

    expect(Array.from(dates)).toEqual([
        [30,  1,  2,  3,  4,  5,  6],
        [ 7,  8,  9, 10, 11, 12, 13],
        [14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27],
        [28, 29, 30, 31,  1,  2,  3],
        [ 4,  5,  6,  7,  8,  9, 10]
    ]);
});

test('select a date', () => {
    const date = new Date(2019, 5, 6);
    const datePicker = new DatePickerViewModel(6, 2019).select(date);
    const dates = Array.from(datePicker.dates).map(week => Array.from(week)).flat();
    const selected = dates.find(date => date.isSelected);
    expect(selected.date).toEqual(6);
});

test('highlight today', () => {
    const today = new Date();
    const datePicker = new DatePickerViewModel(today.getMonth() + 1, today.getFullYear());
    const dates = Array.from(datePicker.dates).map(week => Array.from(week)).flat();
    const date = dates.find(date => date.isToday);
    expect(date.date).toEqual(today.getDate());
});

test('display formatted calendar title', () => {
    const datePicker = new DatePickerViewModel(6, 2019);
    expect(datePicker.title).toEqual('June 2019');
});

test('marks days in the active month', () =>  {
    const datePicker = new DatePickerViewModel(6, 2019);
    const dates = Array.from(datePicker.dates).flat();
    expect(none(slice(dates, 0, 6), date => date.isActiveMonth)).toBe(true);
    expect(all(slice(dates, 6, 36), date => date.isActiveMonth)).toBe(true);
    expect(none(slice(dates, 36, 42), date => date.isActiveMonth)).toBe(true);
});

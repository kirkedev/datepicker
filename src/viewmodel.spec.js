import { DatePickerViewModel } from "./viewmodel";
import { map } from './itertools';

test('create formatted dates for a calendar month', () => {
    const datePicker = new DatePickerViewModel(6, 2019);
    const dates = map(datePicker.dates, week => week.map(({ date }) => date));

    expect(Array.from(dates)).toEqual([
        [                     1,  2],
        [ 3,  4,  5,  6,  7,  8,  9],
        [10, 11, 12, 13, 14, 15, 16],
        [17, 18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, 29, 30]
    ]);
});

test('create formatted dates for the previous calendar month', () => {
    const datePicker = new DatePickerViewModel(6, 2019);
    const dates = map(datePicker.previous().dates, week => week.map(({ date }) => date));

    expect(Array.from(dates)).toEqual([
        [         1,  2,  3,  4,  5],
        [ 6,  7,  8,  9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24, 25, 26],
        [27, 28, 29, 30, 31        ]
    ]);
});

test('create formatted dates for the next calendar month', () => {
    const datePicker = new DatePickerViewModel(6, 2019);
    const dates = map(datePicker.next().dates, week => week.map(({ date }) => date));

    expect(Array.from(dates)).toEqual([
        [ 1,  2,  3,  4,  5,  6,  7],
        [ 8,  9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28],
        [29, 30, 31                ]
    ]);
});

test('select a date', () => {
    const datePicker = new DatePickerViewModel(6, 2019).select(new Date(2019, 5, 6));
    const dates = Array.from(datePicker.dates).flat();
    const date = dates.find(date => date.isSelected);
    expect(date.date).toEqual(6);
});

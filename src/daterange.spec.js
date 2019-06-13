import { getISOWeek, format } from 'date-fns';
import { chunk } from './itertools/chunk';
import { partition } from './itertools/partition';
import { map } from './itertools/map';
import { takeUntil, takeWhile } from './itertools/take';
import { dropUntil, dropWhile } from './itertools/drop';
import { find } from './itertools/filter';
import { countIf } from './itertools/reduce';
import { slice, first } from './itertools';
import { UTCDate, dateRange } from './daterange';

test('create an end-exclusive iterable date range between two dates', () => {
    const start = new Date('2019-06-01');
    const end = new Date('2019-06-08');
    const dates = Array.from(dateRange(start, end)).map(date => date.getDate());

    expect(dates).toEqual([1, 2, 3, 4, 5, 6, 7]);
});

test('lazily map a date range', () => {
    const start = new Date('2019-06-08');
    const end = new Date('2019-06-15');
    const dates = map(dateRange(start, end), date => format(date, 'ddd'));

    expect(Array.from(dates)).toEqual(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
});

test('partition a date range by week', () => {
    const start = new Date('2019-06-01');
    const end = new Date('2019-06-08');

    const [first, second] = Array.from(partition(dateRange(start, end), getISOWeek));
    expect(first.map(date => date.getDate())).toEqual([1, 2]);
    expect(second.map(date => date.getDate())).toEqual([3, 4, 5, 6, 7]);
});

test('chunk a date range by size', () => {
    const start = new Date('2019-06-01');
    const end = new Date('2019-06-11');

    const [first, second] = Array.from(chunk(dateRange(start, end), 7));
    expect(first.map(date => date.getDate())).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(second.map(date => date.getDate())).toEqual([8, 9, 10]);
});

test('get remaining days in a month from an infinite sequence', () => {
    const range = dateRange(new Date('2019-06-28'));

    let dates = Array.from(takeWhile(range, date => date.getMonth() === 5));
    expect(dates.map(date => date.getDate())).toEqual([28, 29, 30]);

    dates = Array.from(takeUntil(range, date => date.getMonth() === 6));
    expect(dates.map(date => date.getDate())).toEqual([28, 29, 30]);
});

test('start an infinite sequence at the next month', () => {
    const range = dateRange(new Date('2019-06-28'));

    let nextMonth = dropWhile(range, date => date.getMonth() === 5);
    expect(first(nextMonth)).toEqual(UTCDate(new Date('2019-07-01')));

    nextMonth = dropUntil(range, date => date.getMonth() === 6);
    expect(first(nextMonth)).toEqual(UTCDate(new Date('2019-07-01')));
});

test('slice a date range', () => {
   const range = dateRange(new Date('2019-06-01'));
   const dates = Array.from(slice(range, 7, 14));
   expect(dates.map(date => date.getDate())).toEqual([7, 8, 9, 10, 11, 12, 13]);
});

test('find the first Saturday in an infinite date range', () => {
    const range = dateRange(new Date('2019-06-02'));
    const saturday = find(range, date => date.getDay() === 6);
    expect(saturday.getDate()).toEqual(8);
});

test('count the number of Saturdays in a month', () => {
    const range = dateRange(new Date('2019-06-01'));
    const june = takeWhile(range, date => date.getMonth() === 5);
    expect(countIf(june, date => date.getDay() === 6)).toEqual(5);
});

test('create a calendar for a given month', () => {
    const range = dateRange(new Date('2019-06-01'));
    const june = takeWhile(range, date => date.getMonth() === 5);
    const weeks = partition(june, getISOWeek);
    const dates = Array.from(map(weeks, week => week.map(date => date.getDate())));

    expect(dates).toEqual([
        [                     1,  2],
        [ 3,  4,  5,  6,  7,  8,  9],
        [10, 11, 12, 13, 14, 15, 16],
        [17, 18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, 29, 30]
    ]);
});

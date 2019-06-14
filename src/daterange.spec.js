import { chunk } from './itertools/chunk';
import { partition } from './itertools/partition';
import { map } from './itertools/map';
import { takeUntil, takeWhile } from './itertools/take';
import { dropUntil, dropWhile } from './itertools/drop';
import { find } from './itertools/filter';
import { countIf } from './itertools/reduce';
import { slice, first } from './itertools';
import { UTCDate, DateRange } from './daterange';

test('create an end-exclusive iterable date range between two dates', () => {
    const start = new Date('2019-06-01');
    const end = new Date('2019-06-08');
    const dates = Array.from(new DateRange(start, end)).map(date => date.getDate());

    expect(dates).toEqual([1, 2, 3, 4, 5, 6, 7]);
});

test('lazily map a date range', () => {
    const start = new Date('2019-06-08');
    const end = new Date('2019-06-15');
    const dates = map(new DateRange(start, end), date => date.getDay());

    expect(Array.from(dates)).toEqual([6, 0, 1, 2, 3, 4, 5]);
});

test('partition a date range by month', () => {
    const start = new Date('2019-05-29');
    const end = new Date('2019-06-04');

    const [first, second] = Array.from(partition(new DateRange(start, end), date => date.getMonth()));
    expect(first.map(date => date.getDate())).toEqual([29, 30, 31]);
    expect(second.map(date => date.getDate())).toEqual([1, 2, 3]);
});

test('chunk a date range by size', () => {
    const start = new Date('2019-06-01');
    const end = new Date('2019-06-11');

    const [first, second] = Array.from(chunk(new DateRange(start, end), 7));
    expect(first.map(date => date.getDate())).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(second.map(date => date.getDate())).toEqual([8, 9, 10]);
});

test('get remaining days in a month from an infinite sequence', () => {
    const range = new DateRange(new Date('2019-06-28'));

    let dates = Array.from(takeWhile(range, date => date.getMonth() === 5));
    expect(dates.map(date => date.getDate())).toEqual([28, 29, 30]);

    dates = Array.from(takeUntil(range, date => date.getMonth() === 6));
    expect(dates.map(date => date.getDate())).toEqual([28, 29, 30]);
});

test('start an infinite sequence at the next month', () => {
    const range = new DateRange(new Date('2019-06-28'));

    let nextMonth = dropWhile(range, date => date.getMonth() === 5);
    expect(first(nextMonth)).toEqual(UTCDate(new Date('2019-07-01')));

    nextMonth = dropUntil(range, date => date.getMonth() === 6);
    expect(first(nextMonth)).toEqual(UTCDate(new Date('2019-07-01')));
});

test('slice a date range', () => {
   const range = new DateRange(new Date('2019-06-01'));
   const dates = Array.from(slice(range, 7, 14));
   expect(dates.map(date => date.getDate())).toEqual([7, 8, 9, 10, 11, 12, 13]);
});

test('find the first Saturday in an infinite date range', () => {
    const range = new DateRange(new Date('2019-06-02'));
    const saturday = find(range, date => date.getDay() === 6);
    expect(saturday.getDate()).toEqual(8);
});

test('count the number of Saturdays in a month', () => {
    const range = new DateRange(new Date('2019-06-01'));
    const june = takeWhile(range, date => date.getMonth() === 5);
    expect(countIf(june, date => date.getDay() === 6)).toEqual(5);
});

import { isSameDate, startOfDay, startOfWeek } from "./lib";

test("truncate a date's time", () => {
    const date = new Date(5, 1, 1, 12, 30, 30, 100);
    const start = startOfDay(date);

    expect(start.getHours()).toEqual(0);
    expect(start.getMinutes()).toEqual(0);
    expect(start.getSeconds()).toEqual(0);
    expect(start.getMilliseconds()).toEqual(0);
    expect(start.getTimezoneOffset()).toEqual(date.getTimezoneOffset());
});

test("find the Sunday prior to a date", () => {
    const date = new Date(2019, 5, 1, 12, 30, 30, 100);
    const start = startOfWeek(date);

    expect(start.getFullYear()).toEqual(2019);
    expect(start.getMonth()).toEqual(4);
    expect(start.getDate()).toEqual(26);
    expect(start.getHours()).toEqual(0);
    expect(start.getMinutes()).toEqual(0);
    expect(start.getSeconds()).toEqual(0);
    expect(start.getMilliseconds()).toEqual(0);
    expect(start.getTimezoneOffset()).toEqual(date.getTimezoneOffset());
});

test("compare two dates ignoring the time", () => {
    const date = new Date(2019, 5, 1, 12, 30, 30, 100);
    const other = new Date(2019, 5, 1);

    expect(isSameDate(date, other)).toBe(true);
    expect(isSameDate(date, new Date())).toBe(false);
});

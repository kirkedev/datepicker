import { chunk, map } from "itertools";
import { isSameDate, startOfDay, startOfWeek, DateSequence } from "dates";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export interface DateViewModel {
    readonly date: Date;
    readonly isSelected: boolean;
    readonly isToday: boolean;
    readonly isActiveMonth: boolean;
}

export function className (date: DateViewModel): string {
    let result = "date";
    if (date.isSelected) result += " selected";
    if (date.isToday) result += " today";
    if (date.isActiveMonth) result += " active";
    return result;
}

export class DatePickerViewModel {
    public readonly selected?: Date;
    public readonly month: number;
    public readonly year: number;

    public constructor(month?: number, year?: number, selected?: Date) {
        const today = new Date();
        this.month = month === undefined ? today.getMonth() + 1 : month;
        this.year = year === undefined ? today.getFullYear() : year;
        if (selected !== undefined) this.selected = startOfDay(selected);
    }

    public get title(): string {
        return `${months[this.month - 1]} ${this.year}`;
    }

    public get dates(): Iterable<Iterable<DateViewModel>> {
        const today = new Date();
        const month = this.month - 1;
        const selected = this.selected;
        const start = startOfWeek(new Date(this.year, month, 1));

        const dates = map(new DateSequence(start).take(42), date => ({
            date,
            isSelected: selected != null && isSameDate(date, selected),
            isToday: isSameDate(date, today),
            isActiveMonth: date.getMonth() === month
        }));

        return chunk(dates, 7);
    }
}

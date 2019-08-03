import { chunk, map } from "itertools";
import { DateSequence } from "./ranges";
import { isSameDate, startOfDay, startOfWeek } from "./lib";

export const months = [
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

export class DatePickerViewModel {
    public readonly selected?: Date;
    private readonly month: number;
    private readonly year: number;

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
        const range = new DateSequence(start).take(42);

        const dates = map(range, date => ({
            date,
            isSelected: selected != null && isSameDate(date, selected),
            isToday: isSameDate(date, today),
            isActiveMonth: date.getMonth() === month
        }));

        return chunk(dates, 7);
    }

    public select = (date: Date): DatePickerViewModel =>
        new DatePickerViewModel(this.month, this.year, date);

    public previous = (): DatePickerViewModel => this.month === 1
        ? new DatePickerViewModel(12, this.year - 1, this.selected)
        : new DatePickerViewModel(this.month - 1, this.year, this.selected);

    public next = (): DatePickerViewModel => this.month === 12
        ? new DatePickerViewModel(1, this.year + 1, this.selected)
        : new DatePickerViewModel(this.month + 1, this.year, this.selected);
}

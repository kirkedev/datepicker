import { format } from "date-fns";
import { calendarMonth, UTCDate } from "./daterange";
import {chunk, map } from "./itertools";

interface DateViewModel {
    readonly date: number;
    readonly isSelected: boolean;
    readonly isToday: boolean;
}

export default class DatePickerViewModel {
    public readonly selected?: Date;
    private readonly month: number;
    private readonly year: number;

    constructor(month: number, year: number, selected?: Date) {
        this.month = month;
        this.year = year;
        this.selected = selected;
    }

    get title(): string {
        return format(new Date(this.year, this.month - 1, 1), "MMMM YYYY");
    }

    get dates(): Iterable<DateViewModel[]> {
        const today = new Date().getDate();
        const selected = this.selected != null && this.selected.getDate();
        const weeks = chunk(calendarMonth(this.month, this.year), 7);

        return map(weeks, (week) => week.map((day) => {
            const date = day.getDate();
            const isSelected = !!selected && selected === date;
            const isToday = date === today;
            return { date, isSelected, isToday };
        }));
    }

    public select = (date: Date) => new DatePickerViewModel(this.month, this.year, UTCDate(date));

    public previous = () => this.month === 1
        ? new DatePickerViewModel(12, this.year - 1, this.selected)
        : new DatePickerViewModel(this.month - 1, this.year, this.selected)

    public next = () => this.month === 12
        ? new DatePickerViewModel(1, this.year + 1, this.selected)
        : new DatePickerViewModel(this.month + 1, this.year, this.selected)
}

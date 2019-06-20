import { DateSequence, startOfDay, startOfWeek } from "./dates";
import { chunk, map } from "./itertools";

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

function calendar(month: number, year: number): Iterable<Date> {
    const start = startOfWeek(new Date(year, month - 1, 1));
    return new DateSequence(start).take(42);
}

export interface DateViewModel {
    readonly date: number;
    readonly isSelected: boolean;
    readonly isToday: boolean;
    readonly isActiveMonth: boolean;
}

export class DatePickerViewModel {
    public readonly selected?: Date;
    private readonly month: number;
    private readonly year: number;

    constructor()
    constructor(month: number, year: number, selected?: Date)
    constructor(month?: number, year?: number, selected?: Date) {
        const today = new Date();
        this.month = month === undefined ? today.getMonth() - 1 : month;
        this.year = year === undefined ? today.getFullYear() : year;
        this.selected = selected;
    }

    get title(): string {
        return `${months[this.month - 1]} ${this.year}`;
    }

    get dates(): Iterable<Iterable<DateViewModel>> {
        const today = new Date().getDate();
        const month = this.month - 1;
        const selected = this.selected != null && this.selected.getDate();

        const dates = map(calendar(this.month, this.year), (day) => {
            const date = day.getDate();
            const isSelected = !!selected && selected === date;
            const isToday = date === today;
            const isActiveMonth = day.getMonth() === month;
            return { date, isSelected, isToday, isActiveMonth };
        });

        return chunk(dates, 7);
    }

    public select = (date: Date) => new DatePickerViewModel(this.month, this.year, startOfDay(date));

    public previous = () => this.month === 1
        ? new DatePickerViewModel(12, this.year - 1, this.selected)
        : new DatePickerViewModel(this.month - 1, this.year, this.selected);

    public next = () => this.month === 12
        ? new DatePickerViewModel(1, this.year + 1, this.selected)
        : new DatePickerViewModel(this.month + 1, this.year, this.selected);
}

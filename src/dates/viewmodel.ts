import { chunk, map } from "itertools";
import { isSameDate, startOfDay, startOfWeek } from "./lib";
import { DateSequence } from "./sequence";

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

interface DateViewModelProps {
    readonly date: Date;
    readonly isSelected: boolean;
    readonly isToday: boolean;
    readonly isActiveMonth: boolean;
}

export class DateViewModel implements DateViewModelProps {
    public readonly date: Date;
    public readonly isSelected: boolean;
    public readonly isToday: boolean;
    public readonly isActiveMonth: boolean;

    public constructor(props: DateViewModelProps) {
        this.date = props.date;
        this.isSelected = props.isSelected;
        this.isToday = props.isToday;
        this.isActiveMonth = props.isActiveMonth
    }

    public get classes(): Iterable<string> {
        return function*(model: DateViewModel) {
            yield "date";
            if (model.isSelected) yield "selected";
            if (model.isToday) yield "today";
            if (model.isActiveMonth) yield "active";
        }(this);
    }

    public get className(): string {
        return Array.from(this.classes).join(" ");
    }
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

        const dates = map(new DateSequence(start).take(42), date =>
            new DateViewModel({
                date,
                isSelected: selected != null && isSameDate(date, selected),
                isToday: isSameDate(date, today),
                isActiveMonth: date.getMonth() === month
            }));

        return chunk(dates, 7);
    }
}

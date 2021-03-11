import { chunk, map } from "itertools";
import { isSameDate, startOfDay, startOfWeek, DateSequence } from "dates";
import DateViewModel from "./DateViewModel";

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
    "December"
];

class DatePickerViewModel {
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
        const { selected, year } = this;
        const start = startOfWeek(new Date(year, month, 1));

        const dates = map(new DateSequence(start).take(42), date => DateViewModel.from({
            date,
            isSelected: selected != null && isSameDate(date, selected),
            isToday: isSameDate(date, today),
            isActive: date.getMonth() === month && date.getFullYear() === year
        }));

        return chunk(dates, 7);
    }
}

export default DatePickerViewModel;

import { getISOWeek } from 'date-fns';
import { Month, UTCDate } from './daterange';
import { map, partition } from './itertools';

class DateViewModel {
    readonly date: number;
    readonly isSelected: boolean;
    readonly isToday: boolean;

    constructor(date: Date, isSelected: boolean, isToday: boolean) {
        this.date = date.getDate();
        this.isSelected = isSelected;
        this.isToday = isToday;
    }
}

export class DatePickerViewModel {
    private readonly month: number;
    private readonly year: number;
    readonly selected?: Date;

    constructor(month: number, year: number, selected?: Date) {
        this.month = month;
        this.year = year;
        this.selected = selected;
    }

    get dates(): Iterable<DateViewModel[]> {
        const today = new Date();
        const month = partition(new Month(this.month, this.year), getISOWeek);

        return map(month, week => week.map(date =>
            new DateViewModel(date, this.selected != null && +date === +this.selected, +date === +today)
        ));
    }

    select(date: Date): DatePickerViewModel {
        return new DatePickerViewModel(this.month, this.year, UTCDate(date));
    }

    previous(): DatePickerViewModel {
        return this.month === 1
            ? new DatePickerViewModel(12, this.year - 1, this.selected)
            : new DatePickerViewModel(this.month - 1, this.year, this.selected);
    }

    next(): DatePickerViewModel {
        return this.month === 12
            ? new DatePickerViewModel(1, this.year + 1, this.selected)
            : new DatePickerViewModel(this.month + 1, this.year, this.selected);
    }
}

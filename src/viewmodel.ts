import {calendar} from "./daterange";

interface DateViewModel {
    date: number;
    isSelected: boolean;
    isToday: boolean;
}

class CalendarViewModel {
    month: number;
    year: number;

    constructor(month: number, year: number) {
        this.month = month;
        this.year = year;
    }

    get dates(): Iterable<Date[]> {
        return calendar(this.month, this.year)
    }

    get previous(): CalendarViewModel {
        return this.month === 1
            ? new CalendarViewModel(12, --this.year)
            : new CalendarViewModel(--this.month, this.year);
    }

    get next(): CalendarViewModel {
        return this.month === 12
            ? new CalendarViewModel(1, ++this.year)
            : new CalendarViewModel(this.month++, this.year);
    }
}

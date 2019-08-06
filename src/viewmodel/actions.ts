import { DatePickerViewModel } from "./viewmodel";

export const selectDate = ({ month, year }: DatePickerViewModel, selected: Date): DatePickerViewModel =>
    new DatePickerViewModel(month, year, selected);

export const previousMonth = ({ month, year, selected }: DatePickerViewModel): DatePickerViewModel =>
    month === 1 ? new DatePickerViewModel(12, --year, selected)
        : new DatePickerViewModel(--month, year, selected);

export const nextMonth = ({ month, year, selected }: DatePickerViewModel): DatePickerViewModel =>
    month === 12 ? new DatePickerViewModel(1, ++year, selected)
        : new DatePickerViewModel(++month, year, selected);

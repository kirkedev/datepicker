import { DatePickerViewModel } from "./viewmodel";

type Action<State> = (state: State) => State;

export const selectDate = (date: Date): Action<DatePickerViewModel> =>
    ({ month, year }: DatePickerViewModel) =>
        new DatePickerViewModel(month, year, date);

export const previousMonth = ({ month, year, selected }: DatePickerViewModel): DatePickerViewModel =>
    month === 1 ? new DatePickerViewModel(12, --year, selected)
        : new DatePickerViewModel(--month, year, selected);

export const nextMonth = ({ month, year, selected }: DatePickerViewModel): DatePickerViewModel =>
    month === 12 ? new DatePickerViewModel(1, ++year, selected)
        : new DatePickerViewModel(++month, year, selected);

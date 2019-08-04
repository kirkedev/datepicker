import { DatePickerViewModel } from "./viewmodel";
import { DatePickerAction, DatePickerActionType } from "./actions";

const selectDate = ({ month, year }: DatePickerViewModel, selected: Date): DatePickerViewModel =>
    new DatePickerViewModel(month, year, selected);

const previousMonth = ({ month, year, selected }: DatePickerViewModel): DatePickerViewModel =>
    month === 1
        ? new DatePickerViewModel(12, --year, selected)
        : new DatePickerViewModel(--month, year, selected);

const nextMonth = ({ month, year, selected }: DatePickerViewModel): DatePickerViewModel =>
    month === 12
        ? new DatePickerViewModel(1, ++year, selected)
        : new DatePickerViewModel(++month, year, selected);

export const reducer = (state: DatePickerViewModel, action: DatePickerAction): DatePickerViewModel => {
    switch (action.type) {
        case DatePickerActionType.PreviousMonth: return previousMonth(state);
        case DatePickerActionType.NextMonth: return nextMonth(state);
        case DatePickerActionType.SelectDate: return selectDate(state, action.data);
    }
};

import { DatePickerViewModel } from "./viewmodel";
import { DatePickerAction, DatePickerActionType } from "./actions";

const selectDate = (state: DatePickerViewModel, date: Date): DatePickerViewModel =>
    new DatePickerViewModel(state.month, state.year, date);

const previousMonth = ({ month, year, selected }: DatePickerViewModel): DatePickerViewModel => month === 1
    ? new DatePickerViewModel(12, year - 1, selected)
    : new DatePickerViewModel(month - 1, year, selected);

const nextMonth = ({ month, year, selected }: DatePickerViewModel): DatePickerViewModel => month === 12
    ? new DatePickerViewModel(1, year + 1, selected)
    : new DatePickerViewModel(month + 1, year, selected);

export const reducer = (state: DatePickerViewModel, action: DatePickerAction): DatePickerViewModel => {
    switch (action.type) {
        case DatePickerActionType.PreviousMonth: return previousMonth(state);
        case DatePickerActionType.NextMonth: return nextMonth(state);
        case DatePickerActionType.SelectDate: return selectDate(state, action.data);
    }
};

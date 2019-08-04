import { DatePickerViewModel } from "./viewmodel";

type ActionType = string;

interface Action {
    type: ActionType;
}

abstract class PayloadAction<T> implements Action {
    public abstract readonly type: ActionType;
    public constructor(public readonly data: T) {}
}

const enum DatePickerActionType {
    PreviousMonth = "PREVIOUS",
    NextMonth = "NEXT",
    SelectDate = "SELECT",
}

class PreviousMonthAction implements Action {
    public readonly type = DatePickerActionType.PreviousMonth;
}

class NextMonthAction implements Action {
    public readonly type = DatePickerActionType.NextMonth;
}

class SelectDateAction extends PayloadAction<Date> {
    public readonly type = DatePickerActionType.SelectDate;
}

type DatePickerAction = PreviousMonthAction | NextMonthAction | SelectDateAction;

export const previousMonth = (): PreviousMonthAction => new PreviousMonthAction();
export const nextMonth = (): NextMonthAction => new NextMonthAction();
export const selectDate = (date: Date): SelectDateAction => new SelectDateAction(date);

const select = (state: DatePickerViewModel, date: Date): DatePickerViewModel =>
    new DatePickerViewModel(state.month, state.year, date);

const previous = ({ month, year, selected }: DatePickerViewModel): DatePickerViewModel => month === 1
    ? new DatePickerViewModel(12, year - 1, selected)
    : new DatePickerViewModel(month - 1, year, selected);

const next = ({ month, year, selected }: DatePickerViewModel): DatePickerViewModel => month === 12
    ? new DatePickerViewModel(1, year + 1, selected)
    : new DatePickerViewModel(month + 1, year, selected);

export const reducer = (state: DatePickerViewModel, action: DatePickerAction): DatePickerViewModel => {
    switch (action.type) {
        case DatePickerActionType.PreviousMonth: return previous(state);
        case DatePickerActionType.NextMonth: return next(state);
        case DatePickerActionType.SelectDate: return select(state, action.data);
    }
};

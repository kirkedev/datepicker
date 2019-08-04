import { DatePickerViewModel } from "dates";

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

export const reducer = (model: DatePickerViewModel, action: DatePickerAction): DatePickerViewModel => {
    switch (action.type) {
        case DatePickerActionType.PreviousMonth: return model.previous();
        case DatePickerActionType.NextMonth: return model.next();
        case DatePickerActionType.SelectDate: return model.select(action.data);
    }
};

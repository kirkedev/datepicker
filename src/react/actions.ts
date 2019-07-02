import { DatePickerViewModel } from "../viewmodel";

interface Action {
    type: string;
}

class PreviousMonthAction implements Action {
    public readonly type = "PREVIOUS";
}

class NextMonthAction implements Action {
    public readonly type = "NEXT";
}

class SelectDateAction implements Action {
    public readonly type = "SELECT";
    public readonly date: Date;

    constructor(date: Date) {
        this.date = date;
    }
}

type DatePickerAction = PreviousMonthAction | NextMonthAction | SelectDateAction;

export const selectDate = (date: Date) => new SelectDateAction(date);
export const previousMonth = () => new PreviousMonthAction();
export const nextMonth = () => new NextMonthAction();

export const reducer = (model: DatePickerViewModel, action: DatePickerAction): DatePickerViewModel => {
    switch (action.type) {
        case "PREVIOUS": return model.previous();
        case "NEXT": return model.next();
        case "SELECT": return model.select(action.date);
    }
};

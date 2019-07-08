import { useReducer } from "react";
import { DatePickerViewModel } from "dates";
import { DatePickerAction, DatePickerActionType } from "./action";

const { PreviousMonth, NextMonth, SelectDate } = DatePickerActionType;

const reducer = (model: DatePickerViewModel, action: DatePickerAction): DatePickerViewModel => {
    switch (action.type) {
        case PreviousMonth: return model.previous();
        case NextMonth: return model.next();
        case SelectDate: return model.select(action.data);
    }
};

export const DatePickerReducer = (initial = new DatePickerViewModel()) =>
    useReducer(reducer, initial);

import React, { ReactElement, useReducer } from "react";
import { DatePickerViewModel, reducer, previousMonth, nextMonth, selectDate } from "dates";
import { SelectDateHandler } from "./index";
import { Calendar } from "./calendar";

export interface DatePickerProps extends SelectDateHandler {
    month?: number;
    year?: number;
}

interface HeaderProps {
    title: string;
    previous: () => any;
    next: () => any;
}

const Header = ({ title, previous, next }: HeaderProps): ReactElement =>
    <div className="header">
        <h1 className="title">{title}</h1>
        <button className="previous" onClick={previous}/>
        <button className="next" onClick={next}/>
    </div>;

export const DatePicker = ({ month, year, onSelectDate }: DatePickerProps): ReactElement => {
    const [model, dispatch] = useReducer(reducer, new DatePickerViewModel(month, year));
    const { title, dates, selected } = model;

    return <div className="datepicker">
        <Header
            title={title}
            previous={() => dispatch(previousMonth())}
            next={() => dispatch(nextMonth())}/>

        <Calendar
            dates={dates}
            onSelectDate={date => dispatch(selectDate(date))}/>

        <button className="submit"
            disabled={selected == null}
            onClick={() => onSelectDate(selected as Date)}/>
    </div>;
};

import React, { ReactElement, useState } from "react";
import { DatePickerViewModel, previousMonth, nextMonth, selectDate } from "viewmodel";
import { Calendar } from "./calendar";
import { SelectDateHandler } from "./index";

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
    const [model, render] = useState(new DatePickerViewModel(month, year));
    const { title, dates, selected } = model;

    return <div className="datepicker">
        <Header
            title={title}
            previous={() => render(previousMonth(model))}
            next={() => render(nextMonth(model))}/>

        <Calendar
            dates={dates}
            onSelectDate={date => render(selectDate(model, date))}/>

        <button className="submit"
            disabled={selected == null}
            onClick={() => onSelectDate(selected as Date)}/>
    </div>;
};

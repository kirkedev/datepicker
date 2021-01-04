import React, { ReactElement, useState } from "react";
import { DatePickerViewModel, previousMonth, nextMonth, selectDate } from "viewmodel";
import { Calendar } from "./calendar";
import { SelectDateHandler } from "./index";

export interface DatePickerProps extends SelectDateHandler {
    month?: number;
    year?: number;
}

export const DatePicker = ({ month, year, onSelectDate }: DatePickerProps): ReactElement => {
    const [model, render] = useState(new DatePickerViewModel(month, year));
    const { title, dates, selected } = model;

    return <div className="datepicker">
        <div className="header">
            <h1 className="title">{title}</h1>
            <button className="previous" onClick={() => render(previousMonth)}/>
            <button className="next" onClick={() => render(nextMonth)}/>
        </div>;

        <Calendar
            dates={dates}
            onSelectDate={date => render(selectDate(date))}/>

        <button className="submit"
            disabled={selected == null}
            onClick={() => onSelectDate(selected as Date)}/>
    </div>;
};

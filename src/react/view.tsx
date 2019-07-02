import React, { useReducer } from "react";
import { indexed, map } from "itertools";
import { DatePickerViewModel, DateViewModel } from "../viewmodel";
import { reducer, nextMonth, previousMonth, selectDate } from "./actions";

interface SelectDateHandler {
    onSelectDate?: (date: Date) => any;
}

interface DayProps extends SelectDateHandler {
    day: DateViewModel;
}

interface WeekProps extends SelectDateHandler {
    week: Iterable<DateViewModel>;
}

interface CalendarProps extends SelectDateHandler {
    calendar: Iterable<Iterable<DateViewModel>>;
}

export const Day = ({ day, onSelectDate = (date: Date) => null }: DayProps) => {
    let className = "date";
    if (day.isToday) { className += " today"; }
    if (day.isSelected) { className += " selected"; }
    if (day.isActiveMonth)  { className += " active"; }

    return <span className={className} onClick={() => onSelectDate(day.date)}>
        { day.date.getDate() }
    </span>;
};

export const Week = ({ week, onSelectDate = (date: Date) => null  }: WeekProps) =>
    <div className="week">{ map(week, (day) =>
        <Day day={day} onSelectDate={onSelectDate} key={day.date.getTime()}/>)
    }</div>;

export const Calendar = ({ calendar, onSelectDate = (date: Date) => null  }: CalendarProps) =>
    <div className="calendar">{ map(indexed(calendar), ({ index, value: week }) =>
        <Week week={week} key={index} onSelectDate={onSelectDate}/>)
    }</div>;

export const DatePicker = () => {
    const [model, dispatch] = useReducer(reducer, new DatePickerViewModel());

    return <div className="datepicker">
        <h1 className="header">{model.title}</h1>
        <button className="previous" onClick={() => dispatch(previousMonth())}/>
        <button className="next" onClick={() => dispatch(nextMonth())}/>
        <Calendar calendar={model.dates} onSelectDate={(date: Date) => dispatch(selectDate(date))}/>
    </div>;
};

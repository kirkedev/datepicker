import React, { ReactElement, useReducer } from "react";
import { enumerate, map } from "itertools";
import { DateViewModel, DatePickerViewModel } from "dates";
import { previousMonth, nextMonth, selectDate } from "./action";
import reducer from "./reducer";

interface SelectDateHandler {
    onSelectDate?: (date: Date) => any;
}

interface DayProps extends SelectDateHandler {
    day: DateViewModel;
}

interface CalendarProps extends SelectDateHandler {
    calendar: Iterable<Iterable<DateViewModel>>;
}

export const Day = ({ day, onSelectDate = () => false }: DayProps): ReactElement => {
    let className = "date";
    if (day.isToday) { className += " today"; }
    if (day.isSelected) { className += " selected"; }
    if (day.isActiveMonth) { className += " active"; }

    return <span className={className} onClick={() => onSelectDate(day.date)}>{
        day.date.getDate()
    }</span>;
};

export const Calendar = ({ calendar, onSelectDate }: CalendarProps): ReactElement =>
    <div className="calendar">{ map(enumerate(calendar), ([index, week]) =>
        <div key={index} className="week">{ map(week, (day) =>
            <Day key={day.date.getTime()} day={day} onSelectDate={onSelectDate}/>)
        }</div>)
    }</div>;

export const DatePicker = (): ReactElement => {
    const [model, dispatch] = useReducer(reducer, new DatePickerViewModel());

    return <div className="datepicker">
        <h1 className="header">{model.title}</h1>
        <button className="previous" onClick={() => dispatch(previousMonth())}/>
        <button className="next" onClick={() => dispatch(nextMonth())}/>
        <Calendar calendar={model.dates} onSelectDate={(date: Date) => dispatch(selectDate(date))}/>
    </div>;
};

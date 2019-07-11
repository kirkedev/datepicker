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

interface WeekProps extends SelectDateHandler {
    week: Iterable<DateViewModel>;
}

interface CalendarProps extends SelectDateHandler {
    calendar: Iterable<Iterable<DateViewModel>>;
}

interface DatePickerProps extends SelectDateHandler {
    month?: number;
    year?: number;
}

const Day = ({ day, onSelectDate = () => false }: DayProps): ReactElement => {
    let className = "date";
    if (day.isToday) { className += " today"; }
    if (day.isSelected) { className += " selected"; }
    if (day.isActiveMonth) { className += " active"; }

    return <span className={className} onClick={() => onSelectDate(day.date)}>{
        day.date.getDate()
    }</span>;
};

const WeekDays = (): ReactElement =>
    <div className="weekdays">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
    </div>;

const Week = ({ week, onSelectDate }: WeekProps): ReactElement =>
    <div className="week">{map(week, day =>
        <Day key={day.date.getTime()} day={day} onSelectDate={onSelectDate}/>)
    }</div>;

const Calendar = ({ calendar, onSelectDate }: CalendarProps): ReactElement =>
    <div className="calendar">
        <WeekDays/>
        <div className="dates">{ map(enumerate(calendar), ([index, week]) =>
            <Week key={index} week={week} onSelectDate={onSelectDate}/>)
        }</div>;
    </div>;

export const DatePicker = ({ month, year, onSelectDate = () => false }: DatePickerProps): ReactElement => {
    const [model, dispatch] = useReducer(reducer, new DatePickerViewModel(month, year));

    return <div className="datepicker">
        <h1 className="title">{model.title}</h1>
        <button className="previous" onClick={() => dispatch(previousMonth())}/>
        <button className="next" onClick={() => dispatch(nextMonth())}/>
        <Calendar calendar={model.dates} onSelectDate={(date: Date) => dispatch(selectDate(date))}/>
        <button className="submit" disabled={model.selected == null}
            onClick={() => { if (model.selected != null) onSelectDate(model.selected) }} />
    </div>;
};

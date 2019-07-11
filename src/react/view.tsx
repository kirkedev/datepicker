import React, { ReactElement, useReducer } from "react";
import { enumerate, map } from "itertools";
import { DateViewModel, DatePickerViewModel } from "dates";
import { reducer, previousMonth, nextMonth, selectDate } from "./reducer";

interface SelectDateHandler {
    onSelectDate: (date: Date) => any;
}

interface DatePickerProps extends SelectDateHandler {
    month?: number;
    year?: number;
}

interface HeaderProps {
    title: string;
    previous: () => any;
    next: () => any;
}

interface CalendarProps extends SelectDateHandler {
    calendar: Iterable<Iterable<DateViewModel>>;
}

interface WeekProps extends SelectDateHandler {
    week: Iterable<DateViewModel>;
}

interface DayProps extends SelectDateHandler {
    day: DateViewModel;
}

const Day = ({ day, onSelectDate }: DayProps): ReactElement => {
    let className = "date";
    if (day.isToday) { className += " today"; }
    if (day.isSelected) { className += " selected"; }
    if (day.isActiveMonth) { className += " active"; }

    return <span className={className} onClick={() => onSelectDate(day.date)}>{
        day.date.getDate()
    }</span>;
};

const Week = ({ week, onSelectDate }: WeekProps): ReactElement =>
    <div className="week">{ map(week, day =>
        <Day key={day.date.getTime()} day={day} onSelectDate={onSelectDate}/>)
    }</div>;

const WeekDays = (): ReactElement => <div className="weekdays">
    <span>Sun</span>
    <span>Mon</span>
    <span>Tue</span>
    <span>Wed</span>
    <span>Thu</span>
    <span>Fri</span>
    <span>Sat</span>
</div>;

const Calendar = ({ calendar, onSelectDate }: CalendarProps): ReactElement =>
    <div className="calendar">
        <WeekDays/>
        <div className="dates">{ map(enumerate(calendar), ([index, week]) =>
            <Week key={index} week={week} onSelectDate={onSelectDate}/>)
        }</div>;
    </div>;

const Header = ({ title, previous, next }: HeaderProps): ReactElement =>
    <div className="header">
        <h1 className="title">{title}</h1>
        <button className="previous" onClick={previous}/>
        <button className="next" onClick={next}/>
    </div>;

export const DatePicker = ({ month, year, onSelectDate }: DatePickerProps): ReactElement => {
    const [model, dispatch] = useReducer(reducer, new DatePickerViewModel(month, year));

    return <div className="datepicker">
        <Header
            title={model.title}
            previous={() => dispatch(previousMonth())}
            next={() => dispatch(nextMonth())}/>

        <Calendar
            calendar={model.dates}
            onSelectDate={(date: Date) => dispatch(selectDate(date))}/>

        <button className="submit"
            disabled={model.selected == null}
            onClick={() => onSelectDate(model.selected as Date)} />
    </div>;
};

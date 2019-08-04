import React, { ReactElement } from "react";
import { enumerate, map } from "itertools";
import { DateViewModel } from "dates";
import { SelectDateHandler } from "./index";

interface CalendarProps extends SelectDateHandler {
    dates: Iterable<Iterable<DateViewModel>>;
}

interface WeekProps extends SelectDateHandler {
    week: Iterable<DateViewModel>;
}

interface DayProps extends SelectDateHandler {
    day: DateViewModel;
}

const Day = ({ day, onSelectDate }: DayProps): ReactElement => {
    return <span className={day.className} onClick={() => onSelectDate(day.date)}>{
        day.date.getDate()
    }</span>;
};

const Week = ({ week, onSelectDate }: WeekProps): ReactElement =>
    <div className="week">{ map(week, day =>
        <Day key={day.date.getTime()} day={day} onSelectDate={onSelectDate}/>)
    }</div>;

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

export const Calendar = ({ dates, onSelectDate }: CalendarProps): ReactElement =>
    <div className="calendar">
        <WeekDays/>
        <div className="dates">{ map(enumerate(dates), ([index, week]) =>
            <Week key={index} week={week} onSelectDate={onSelectDate}/>)
        }</div>;
    </div>;

import { map } from "itertools";
import React from "react";
import { useState } from "react";
import { DatePickerViewModel, DateViewModel } from "../viewmodel";

const Date = (date: DateViewModel) => {
    let className = "date";
    if (date.isToday) { className += " today"; }
    if (date.isSelected) { className += " selected"; }
    if (date.isActiveMonth)  {className += " current"; }

    return <span className={className}>{date.date}</span>;
};

const Week = (week: Iterable<DateViewModel>) =>
    <div className="week">
        { map(week, (date) => <Date {...date}/>) }
    </div>;

const Calendar = (dates: Iterable<Iterable<DateViewModel>>) =>
    <div className="calendar">
        { map(dates, (week) => <Week {...week}/>) }
    </div>;

export const DatePicker = () => {
    const [model, update] = useState(new DatePickerViewModel());

    return <>
        <h1 className="header">{model.title}</h1>
        <button className="previous" onClick={() => update(model.previous())}/>
        <button className="next" onClick={() => update(model.next())}/>
        <Calendar {...model.dates} />
    </>;
};

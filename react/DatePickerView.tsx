import React from "react";
import { useDatePicker } from "./DatePickerProvider";
import Calendar from "./Calendar";

const DatePickerView = (): JSX.Element => {
    const [model, interactor] = useDatePicker();

    return <div className="datepicker">
        <div className="header">
            <h1 className="title">{model.title}</h1>
            <button className="previous" onClick={interactor.previous}/>
            <button className="next" onClick={interactor.next}/>
        </div>

        <Calendar dates={model.dates}/>

        <button className="submit"
            disabled={model.selected == null}
            onClick={interactor.submit}/>
    </div>;
};

export default DatePickerView;

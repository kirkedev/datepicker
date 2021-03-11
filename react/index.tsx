import DatePickerView from "./DatePickerView";
import DatePickerProvider from "./DatePickerProvider";

export interface DatePickerProps {
    month: number;
    year: number;
    onSelectDate: (date: Date) => void;
}

function DatePicker({ month, year, onSelectDate }: DatePickerProps): JSX.Element {
    return <DatePickerProvider month={month} year={year} onSelectDate={onSelectDate}>
        <DatePickerView/>
    </DatePickerProvider>;
}

export default DatePicker;

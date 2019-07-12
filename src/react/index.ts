import { DatePicker } from "./datepicker";

export interface SelectDateHandler {
    onSelectDate: (date: Date) => any;
}

export default DatePicker;

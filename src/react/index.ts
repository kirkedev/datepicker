import { DatePicker } from "./datepicker";

export interface SelectDateHandler {
    onSelectDate: (date: Date) => any;
}

export const classNames = (classes: {[key: string]: boolean}): string => Object.entries(classes)
    .reduce((className, [key, value]) => value ? `${className} ${key}` : className, "")
    .slice(1);

export default DatePicker;

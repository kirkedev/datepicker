export { DateRange, DateSequence } from "./ranges";
export { DateViewModel, DatePickerViewModel } from "./viewmodel";

export const startOfDay = (date: Date) => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
};

export function startOfWeek(date: Date) {
    const result = startOfDay(date);
    result.setDate(date.getDate() - date.getDay());
    return result;
}

export const isSameDate = (first: Date, second: Date) =>
    first.getDate() === second.getDate() &&
    first.getMonth() === second.getMonth() &&
    first.getFullYear() === second.getFullYear();

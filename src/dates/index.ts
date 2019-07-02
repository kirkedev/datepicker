export { DateRange, DateSequence } from "./dateRange";

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
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

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

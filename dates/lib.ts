export function startOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}

export function startOfWeek(date: Date): Date {
    const result = startOfDay(date);
    result.setDate(date.getDate() - date.getDay());
    return result;
}

export const isSameDate = (first: Date, second: Date): boolean =>
    first.getDate() === second.getDate() &&
    first.getMonth() === second.getMonth() &&
    first.getFullYear() === second.getFullYear();

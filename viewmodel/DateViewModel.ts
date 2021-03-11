interface DateViewModel {
    readonly date: Date;
    readonly className: string;
}

function* classNames(isSelected: boolean, isToday: boolean, isActive: boolean): Iterable<string> {
    yield "date";
    if (isSelected) yield "selected";
    if (isToday) yield "today";
    if (isActive) yield "active";
}

interface DateViewModelProps {
    date: Date;
    isSelected: boolean;
    isToday: boolean;
    isActive: boolean;
}

namespace DateViewModel {
    export const from = ({ date, isSelected, isToday, isActive }: DateViewModelProps): DateViewModel => ({
        date,
        className: Array.from(classNames(isSelected, isToday, isActive)).join(" ")
    });
}

export default DateViewModel;

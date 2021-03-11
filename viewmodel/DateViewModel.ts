interface DateViewModel {
    readonly date: Date;
    readonly isSelected: boolean;
    readonly isToday: boolean;
    readonly isActiveMonth: boolean;
}

function* classNames(this: DateViewModel): Iterable<string> {
    yield "date";
    if (this.isSelected) yield "selected";
    if (this.isToday) yield "today";
    if (this.isActiveMonth) yield "active";
}

namespace DateViewModel {
    export const className = (date: DateViewModel): string =>
        Array.from(classNames.call(date)).join(" ");
}

export default DateViewModel;

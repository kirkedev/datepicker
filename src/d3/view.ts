// import { EnterElement, select, Selection } from "d3-selection";
// import { DatePickerViewModel, DateViewModel } from "dates";
//
// type CreatedDate = Selection<EnterElement, DateViewModel, HTMLDivElement, Iterable<DateViewModel>>;
// type Date = Selection<HTMLSpanElement, DateViewModel, HTMLDivElement, DateViewModel[]>;
// type CreatedWeek = Selection<EnterElement, DateViewModel[], HTMLDivElement, DatePickerViewModel>;
// type Week = Selection<HTMLDivElement, DateViewModel[][], HTMLDivElement, DatePickerViewModel>;
// type Calendar = Selection<HTMLDivElement, DatePickerViewModel, some, some>;
//
// const remove = (element: Selection<Element, some, some, some>): some => element.remove();
//
// const createDate = (selection: CreatedDate): some => selection.append("span").classed("date", true);
//
// const updateDate = (selection: Date): some => selection
//     .text((date) => date.date)
//     .classed("active", (date) => date.isActiveMonth)
//     .classed("today", (date) => date.isToday)
//     .classed("selected", (date) => date.isSelected);
//
// const createWeek = (selection: CreatedWeek): some => selection.append("div").classed("week", true);
//
// const updateWeek = (selection: Week): some => selection.selectAll(".date")
//     .data<DateViewModel[]>((calendar) => calendar)
//     .join(createDate, updateDate, remove);
//
// const updateCalendar = (selection: Calendar): some => selection.selectAll(".week")
//     .data<Iterable<DateViewModel>>((calendar) => Array.from(calendar.calendar))
//     .join(createWeek, updateWeek, remove);
//
// export function DatePicker(this: HTMLElement, initial: DatePickerViewModel): (day: DatePickerViewModel) => void {
//     const datepicker = select(this).datum(initial);
//
//     const header = datepicker.append("h1")
//         .classed("header", true)
//         .text(({title}) => title);
//
//     const calendar = datepicker.append("div").classed("calendar", true);
//
//     function update(model: DatePickerViewModel): void {
//         datepicker.datum(model);
//         header.text(({title}) => title);
//         updateCalendar(calendar);
//     }
//
//     datepicker.append("button")
//         .classed("previousMonth", true)
//         .on("click", (day) => update(day.previousMonth()));
//
//     datepicker.append("button")
//         .classed("nextMonth", true)
//         .on("click", (day) => update(day.nextMonth()));
//
//     return update;
// }

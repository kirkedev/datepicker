import { DatePicker } from "./datepicker";
import { act, ReactTestInstance } from "react-test-renderer";

export interface SelectDateHandler {
    onSelectDate: (date: Date) => any;
}

export const findByClass = (instance: ReactTestInstance, className: string): ReactTestInstance =>
    instance.findByProps({ className });

export const hasClass = (instance: ReactTestInstance, className: string): boolean =>
    RegExp(String.raw`\b${className}\b`).test(instance.props.className);

export const getText = (instance: ReactTestInstance): string =>
    instance.children[0] as string;

export function click(instance: ReactTestInstance): void;
export function click(instance: ReactTestInstance, className: string): void;
export function click(instance: ReactTestInstance, className?: string): void {
    if (className !== undefined) instance = findByClass(instance, className);
    act(() => instance.props.onClick());
}

export default DatePicker;

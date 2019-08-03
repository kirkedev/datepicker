import React from "react";
import { act, create, ReactTestInstance } from "react-test-renderer";
import { defineFeature, loadFeature } from "jest-cucumber";
import { DatePicker, DatePickerProps } from "./datepicker";

const datepicker = (props: DatePickerProps): ReactTestInstance =>
    create(<DatePicker {...props}/>).root;

const findByClass = (instance: ReactTestInstance, className: string): ReactTestInstance =>
    instance.findByProps({ className });

const hasClass = (instance: ReactTestInstance, className: string): boolean =>
    RegExp(String.raw`\b${className}\b`).test(instance.props.className);

const getText = (instance: ReactTestInstance): string =>
    instance.children[0] as string;

function click(instance: ReactTestInstance): void;
function click(instance: ReactTestInstance, className: string): void;
function click(instance: ReactTestInstance, className?: string): void {
    if (className !== undefined) instance = findByClass(instance, className);
    act(() => instance.props.onClick());
}

const isSelected = (instance: ReactTestInstance): boolean =>
    hasClass(instance, "selected");

const isDisabled = (instance: ReactTestInstance): boolean =>
    instance.props.disabled;

const title = (instance: ReactTestInstance): string =>
    getText(findByClass(instance, "title"));

const getDates = (instance: ReactTestInstance): ReactTestInstance[] =>
    instance.findAllByType("span").filter(el => hasClass(el, "date"));

const parseDate = (instance: ReactTestInstance): number =>
    parseInt(getText(instance), 10);

const parseDates = (instance: ReactTestInstance): number[] =>
    getDates(instance).map(parseDate);

const findDate = (instance: ReactTestInstance, date: number): ReactTestInstance =>
    getDates(instance).find(el => parseDate(el) === date)!;

defineFeature(loadFeature("src/react/datepicker.feature"), test => {
    const onSelectDate = jest.fn();

    test("Go to previous month", ({ given, when, then, and }) => {
        let instance: ReactTestInstance;

        given("a datepicker for June 2019", () => {
            instance = datepicker({ month: 6, year: 2019, onSelectDate });
            expect(title(instance)).toEqual("June 2019");
        });

        when("I click the previous button", () => {
            click(instance, "previous");
        });

        then("I see dates for May 2019", () => {
            expect(parseDates(instance)).toEqual([
                28, 29, 30, 1, 2, 3, 4,
                5, 6, 7, 8, 9, 10, 11,
                12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25,
                26, 27, 28, 29, 30, 31, 1,
                2, 3, 4, 5, 6, 7, 8,
            ]);
        });

        and("the header updates to May 2019", () => {
            expect(title(instance)).toEqual("May 2019");
        });
    });

    test("Go to next month", ({ given, when, then, and }) => {
        let instance: ReactTestInstance;

        given("a datepicker for June 2019", () => {
            instance = datepicker({ month: 6, year: 2019, onSelectDate });
            expect(title(instance)).toEqual("June 2019");
        });

        when("I click the next button", () => {
            click(instance, "next");
        });

        then("I see dates for July 2019", () => {
            expect(parseDates(instance)).toEqual([
                30, 1, 2, 3, 4, 5, 6,
                7, 8, 9, 10, 11, 12, 13,
                14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27,
                28, 29, 30, 31, 1, 2, 3,
                4, 5, 6, 7, 8, 9, 10,
            ]);
        });

        and("the header updates to July 2019", () => {
            expect(title(instance)).toEqual("July 2019");
        });
    });

    test("Select a date", ({ given, when, then, and })=> {
        let instance: ReactTestInstance;

        given("a datepicker for June 2019", () => {
            instance = datepicker({ month: 6, year: 2019, onSelectDate });

            expect(title(instance)).toEqual("June 2019");
            expect(getDates(instance).some(isSelected)).toBe(false);
            expect(isDisabled(findByClass(instance, "submit"))).toBe(true);
        });

        when("I select June 6", () => {
            click(findDate(instance, 6));
        });

        then("June 6 is highlighted", () => {
            expect(getDates(instance).filter(isSelected).length).toBe(1);
            expect(isSelected(findDate(instance, 6))).toBe(true);
        });

        and("the submit button is enabled", () => {
            expect(isDisabled(findByClass(instance, "submit"))).toBe(false);
        });

        when("I click the submit button", () => {
            click(instance, "submit");
        });

        then("June 6 is chosen", () => {
            expect(onSelectDate).toHaveBeenCalledWith(new Date(2019, 5, 6));
        });
    });
});

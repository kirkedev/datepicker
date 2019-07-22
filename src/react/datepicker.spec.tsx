import React from "react";
import { act, create, ReactTestInstance } from "react-test-renderer";
import { defineFeature, loadFeature } from "jest-cucumber";
import { none, one } from "itertools";
import { DatePicker } from "./datepicker";

const getTitle = (instance: ReactTestInstance): string =>
    instance.findByProps({ className: "title" }).children[0] as string;

const getDates = (instance: ReactTestInstance): ReactTestInstance[] =>
    instance.findAllByType("span").filter(({ props }) =>
        "className" in props && props.className.includes("date"));

const parseDates = (instance: ReactTestInstance): number[] => getDates(instance)
    .map(el => el.children[0].toString())
    .map(date => parseInt(date, 10));

defineFeature(loadFeature("src/react/datepicker.feature"), test => {
    const onSelectDate = jest.fn();

    test("Go to previous month", ({ given, when, then, and }) => {
        let instance: ReactTestInstance;

        given("a datepicker for June 2019", () => {
            const datepicker = <DatePicker month={6} year={2019} onSelectDate={onSelectDate}/>;
            instance = create(datepicker).root;
            expect(getTitle(instance)).toEqual("June 2019");
        });

        when("I click the previous button", () => {
            act(() => instance.findByProps({ className: "previous" }).props.onClick());
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
            expect(getTitle(instance)).toEqual("May 2019");
        });
    });

    test("Go to next month", ({ given, when, then, and }) => {
        let instance: ReactTestInstance;

        given("a datepicker for June 2019", () => {
            const datepicker = <DatePicker month={6} year={2019} onSelectDate={onSelectDate}/>;
            instance = create(datepicker).root;
            expect(getTitle(instance)).toEqual("June 2019");
        });

        when("I click the next button", () => {
            act(() => instance.findByProps({ className: "next" }).props.onClick());
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
            expect(getTitle(instance)).toEqual("July 2019");
        });
    });

    test("Select a date", ({ given, when, then, and })=> {
        let instance: ReactTestInstance;

        given("a datepicker for June 2019", () => {
            const datepicker = <DatePicker month={6} year={2019} onSelectDate={onSelectDate}/>;
            instance = create(datepicker).root;

            expect(getTitle(instance)).toEqual("June 2019");
            expect(none(getDates(instance), el => el.props.className.includes("selected"))).toBe(true);
            expect(instance.findByProps({ className: "submit" }).props.disabled).toBe(true);
        });

        when("I select June 6", () => {
            act(() => getDates(instance)
                .find(el => el.children[0] === "6")!
                .props.onClick());
        });

        then("June 6 is highlighted", () => {
            const dates = getDates(instance);
            expect(one(dates, el => el.props.className.includes("selected"))).toBe(true);

            const date = dates.find(el => el.children[0] === "6");
            expect(date!.props.className).toContain("selected");
        });

        and("the submit button is enabled", () => {
            expect(instance.findByProps({ className: "submit" }).props.disabled).toBe(false);
        });

        when("I click the submit button", () => {
            instance.findByProps({ className: "submit" }).props!.onClick();
        });

        then("June 6 is chosen", () => {
            expect(onSelectDate).toHaveBeenCalledWith(new Date(2019, 5, 6));
        });
    });
});

import React, { ReactElement } from "react";
import { act, create, ReactTestInstance, ReactTestRenderer } from "react-test-renderer";
import { DatePicker } from "./view";
import { none, one } from "../itertools/reduce";
import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("./src/react/datepicker.feature");

defineFeature(feature, test => {
    let renderer: ReactTestRenderer;

    const getTitle = (): string =>
        renderer.root.findByProps({ className: "title" }).children[0] as string;

    const getDates = (): ReactTestInstance[] => renderer.root.findAllByType("span")
        .filter(el => el.props.hasOwnProperty("className") && el.props.className.includes("date"));

    const parseDates = (): number[] => getDates()
        .map(el => el.children[0].toString())
        .map(date => parseInt(date, 10));

    test("Go to previous month", ({ given, when, then, and }) => {
        let datePicker: ReactElement;

        given("a datepicker for June 2019", () => {
            datePicker = <DatePicker month={6} year={2019}/>;
            renderer = create(datePicker);
            expect(getTitle()).toEqual("June 2019");
        });

        when("I click the previous button", () => {
            act(() => {
                renderer.root.findByProps({ className: "previous" }).props.onClick();
                renderer.update(datePicker);
            });
        });

        then("I see dates for May 2019", () => {
            expect(parseDates()).toEqual([
                28, 29, 30,  1,  2,  3,  4,
                 5,  6,  7,  8,  9, 10, 11,
                12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25,
                26, 27, 28, 29, 30, 31,  1,
                 2,  3,  4,  5,  6,  7,  8,
            ]);
        });

        and("the header updates to May 2019", () => {
            expect(getTitle()).toEqual("May 2019");
        });
    });

    test("Go to next month", ({ given, when, then, and }) => {
        let datePicker: ReactElement;

        given("a datepicker for June 2019", () => {
            datePicker = <DatePicker month={6} year={2019}/>;
            renderer = create(datePicker);
            expect(getTitle()).toEqual("June 2019");
        });

        when("I click the next button", () => {
            act(() => {
                renderer.root.findByProps({ className: "next" }).props.onClick();
                renderer.update(datePicker);
            });
        });

        then("I see dates for July 2019", () => {
            expect(parseDates()).toEqual([
                30,  1,  2,  3,  4,  5,  6,
                 7,  8,  9, 10, 11, 12, 13,
                14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27,
                28, 29, 30, 31,  1,  2,  3,
                 4,  5,  6,  7,  8,  9, 10,
            ]);
        });

        and("the header updates to July 2019", () => {
            expect(getTitle()).toEqual("July 2019");
        });
    });

    test("Select a date", ({ given, when, then, and })=> {
        let datePicker: ReactElement;

        given("a datepicker for June 2019", () => {
            datePicker = <DatePicker month={6} year={2019}/>;
            renderer = create(datePicker);
            const submit = renderer.root.findByProps({ className: "submit" });

            expect(getTitle()).toEqual("June 2019");
            expect(none(getDates(), el => el.props.className.includes("selected"))).toBe(true);
            expect(submit.props.disabled).toBe(true);
        });

        when("I select June 6", () => {
            act(() => {
                renderer.root.findAllByType("span").find(el => el.children[0] === "6")!.props.onClick();
                renderer.update(datePicker);
            });
        });

        then("June 6 is highlighted", () => {
            const dates = getDates();
            expect(one(dates, el => el.props.className.includes("selected"))).toBe(true);

            const date = dates.find(el => el.children[0] === "6");
            expect(date!.props.className).toContain("selected");
        });

        and("the submit button is enabled", () => {
            const submit = renderer.root.findByProps({ className: "submit" });
            expect(submit.props.disabled).toBe(false);
        });
    });
});

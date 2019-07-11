import React, { ReactElement } from "react";
import { act, create, ReactTestInstance, ReactTestRenderer } from "react-test-renderer";
import { DatePicker } from "./view";
import { none, one } from "../itertools/reduce";
import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("./src/react/datepicker.feature");

const getTitle = (instance: ReactTestInstance): string =>
    instance.findByProps({ className: "title" }).children[0] as string;

const getDates = (instance: ReactTestInstance): ReactTestInstance[] => instance.findAllByType("span")
    .filter(el => el.props.hasOwnProperty("className") && el.props.className.includes("date"));

const parseDates = (instance: ReactTestInstance): number[] => getDates(instance)
    .map(el => el.children[0].toString())
    .map(date => parseInt(date, 10));

defineFeature(feature, test => {
    test("Go to previous month", ({ given, when, then, and }) => {
        let datePicker: ReactElement;
        let renderer: ReactTestRenderer;
        let root: ReactTestInstance;

        given("a datepicker for June 2019", () => {
            datePicker = <DatePicker month={6} year={2019}/>;
            renderer = create(datePicker);
            root = renderer.root;

            expect(getTitle(root)).toEqual("June 2019");
        });

        when("I click the previous button", () => {
            act(() => {
                root.findByProps({ className: "previous" }).props.onClick();
                renderer.update(datePicker);
            });
        });

        then("I see dates for May 2019", () => {
            expect(parseDates(root)).toEqual([
                28, 29, 30,  1,  2,  3,  4,
                 5,  6,  7,  8,  9, 10, 11,
                12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25,
                26, 27, 28, 29, 30, 31,  1,
                 2,  3,  4,  5,  6,  7,  8,
            ]);
        });

        and("the header updates to May 2019", () => {
            expect(getTitle(root)).toEqual("May 2019");
        });
    });

    test("Go to next month", ({ given, when, then, and }) => {
        let datePicker: ReactElement;
        let renderer: ReactTestRenderer;
        let root: ReactTestInstance;

        given("a datepicker for June 2019", () => {
            datePicker = <DatePicker month={6} year={2019}/>;
            renderer = create(datePicker);
            root = renderer.root;

            expect(getTitle(root)).toEqual("June 2019");
        });

        when("I click the next button", () => {
            act(() => {
                root.findByProps({ className: "next" }).props.onClick();
                renderer.update(datePicker);
            });
        });

        then("I see dates for July 2019", () => {
            expect(parseDates(root)).toEqual([
                30,  1,  2,  3,  4,  5,  6,
                 7,  8,  9, 10, 11, 12, 13,
                14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27,
                28, 29, 30, 31,  1,  2,  3,
                 4,  5,  6,  7,  8,  9, 10,
            ]);
        });

        and("the header updates to July 2019", () => {
            expect(getTitle(renderer.root)).toEqual("July 2019");
        });
    });

    test("Select a date", ({ given, when, then, and })=> {
        let datePicker: ReactElement;
        let renderer: ReactTestRenderer;
        let root: ReactTestInstance;

        const onSelectDate = jest.fn();

        given("a datepicker for June 2019", () => {
            datePicker = <DatePicker month={6} year={2019} onSelectDate={onSelectDate}/>;
            renderer = create(datePicker);
            root = renderer.root;

            expect(getTitle(root)).toEqual("June 2019");
            expect(none(getDates(root), el => el.props.className.includes("selected"))).toBe(true);
            expect(root.findByProps({ className: "submit" }).props.disabled).toBe(true);
        });

        when("I select June 6", () => {
            act(() => {
                root.findAllByType("span").find(el => el.children[0] === "6")!.props.onClick();
                renderer.update(datePicker);
            });
        });

        then("June 6 is highlighted", () => {
            const dates = getDates(root);
            expect(one(dates, el => el.props.className.includes("selected"))).toBe(true);

            const date = dates.find(el => el.children[0] === "6");
            expect(date!.props.className).toContain("selected");
        });

        and("the submit button is enabled", () => {
            expect(root.findByProps({ className: "submit" }).props.disabled).toBe(false);
        });

        when("I click the submit button", () => {
            root.findByProps({ className: "submit" }).props!.onClick();
        });

        then("June 6 is chosen", () => {
            expect(onSelectDate).toHaveBeenCalledWith(new Date(2019, 5, 6));
        });
    });
});

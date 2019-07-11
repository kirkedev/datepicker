import React, { ReactElement } from "react";
import { act, create, ReactTestInstance, ReactTestRenderer, ReactTestRendererJSON } from "react-test-renderer";
import { DatePicker, Day } from "./view";
import { none, one } from "../itertools/reduce";

test("render a day", () => {
    const model = {
        date: new Date(2019, 5, 6),
        isActiveMonth: true,
        isSelected: true,
        isToday: true
    };

    const day = create(<Day day={model} />).toJSON() as ReactTestRendererJSON;
    expect(day.children).toContainEqual("6");

    const { className } = day.props;
    expect(className).toContain("date");
    expect(className).toContain("active");
    expect(className).toContain("today");
    expect(className).toContain("selected");
});


describe("datepicker", () => {
    let datePicker: ReactElement;
    let renderer: ReactTestRenderer;
    const onSelectDate = jest.fn();

    beforeEach(() => {
        datePicker = <DatePicker month={6} year={2019} onSelectDate={onSelectDate}/>;
        renderer = create(datePicker);
    });

    const getTitle = (): string => renderer.root.findByProps({ className: "title" }).children[0] as string;

    const getDates = (): ReactTestInstance[] => renderer.root.findAllByType("span")
        .filter(el => el.props.hasOwnProperty("className") && el.props.className.includes("date"));

    const parseDates = (): number[] => getDates()
        .map(el => el.children[0].toString())
        .map(date => parseInt(date, 10));

    test("render datepicker", () => {
        expect(getTitle()).toEqual("June 2019");

        expect(parseDates()).toEqual([
            26, 27, 28, 29, 30, 31,  1,
             2,  3,  4,  5,  6,  7,  8,
             9, 10, 11, 12, 13, 14, 15,
            16, 17, 18, 19, 20, 21, 22,
            23, 24, 25, 26, 27, 28, 29,
            30,  1,  2,  3,  4,  5,  6,
        ]);
    });

    test("go to previous month", () => {
        act(() => {
            renderer.root.findByProps({ className: "previous" }).props.onClick();
            renderer.update(datePicker);
        });

        expect(getTitle()).toEqual("May 2019");

        expect(parseDates()).toEqual([
            28, 29, 30,  1,  2,  3,  4,
             5,  6,  7,  8,  9, 10, 11,
            12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24, 25,
            26, 27, 28, 29, 30, 31,  1,
             2,  3,  4,  5,  6,  7,  8,
        ]);
    });

    test("go to next month", () => {
        act(() => {
            renderer.root.findByProps({ className: "next" }).props.onClick();
            renderer.update(datePicker);
        });

        expect(getTitle()).toEqual("July 2019");

        expect(parseDates()).toEqual([
            30,  1,  2,  3,  4,  5,  6,
             7,  8,  9, 10, 11, 12, 13,
            14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27,
            28, 29, 30, 31,  1,  2,  3,
             4,  5,  6,  7,  8,  9, 10,
        ]);
    });

    test("select a date", () => {
        expect(none(getDates(), el => el.props.className.includes("selected"))).toBe(true);

        let submit = renderer.root.findByProps({ className: "submit" });
        expect(submit.props.disabled).toBe(true);

        act(() => {
            renderer.root.findAllByType("span").find(el => el.children[0] === "6")!.props.onClick();
            renderer.update(datePicker);
        });

        const dates = getDates();
        expect(one(dates, el => el.props.className.includes("selected"))).toBe(true);

        const date = dates.find(el => el.children[0] === "6");
        expect(date!.props.className).toContain("selected");

        submit = renderer.root.findByProps({ className: "submit" });
        expect(submit.props.disabled).toBe(false);

        submit.props.onClick();
        expect(onSelectDate).toHaveBeenCalledWith(new Date(2019, 5, 6));
    });
});

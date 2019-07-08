import React from "react";
import { create, ReactTestRendererJSON } from "react-test-renderer";
import { Calendar, Day } from "./view";

test("render a day", () => {
    const model = {
        date: new Date(2019, 5, 6),
        isActiveMonth: true,
        isSelected: true,
        isToday: true,
    };

    const day = create(<Day day={model} />).toJSON() as ReactTestRendererJSON;
    expect(day.children).toContainEqual("6");

    const { className } = day.props;
    expect(className).toContain("date");
    expect(className).toContain("active");
    expect(className).toContain("today");
    expect(className).toContain("selected");
});

test("render calendar", () => {
    const model = [
        [
            {
                date: new Date(2019, 4, 31),
                isActiveMonth: false,
                isSelected: false,
                isToday: false,
            },
        ],
        [
            {
                date: new Date(2019, 5, 1),
                isActiveMonth: true,
                isSelected: true,
                isToday: true,
            },
        ],
    ];

    const calendar = create(<Calendar calendar={model} />).toJSON() as ReactTestRendererJSON;
    expect(calendar.props.className).toEqual("calendar");
    expect(calendar.children!.length).toEqual(2);

    const [first, second] = calendar.children as ReactTestRendererJSON[];
    expect(first.props.className).toEqual("week");
    expect(first.children!.length).toEqual(1);

    expect(second.props.className).toEqual("week");
    expect(second.children!.length).toEqual(1);
});

import React from "react";
import { create } from "react-test-renderer";
import { Calendar, Day, Week } from "./view";

test("render a day", () => {
    const date = new Date(2019, 5, 6);

    const model = {
        date,
        isActiveMonth: true,
        isSelected: true,
        isToday: true,
    };

    const day = create(<Day day={model}/>).toJSON();
    expect(day.children).toContainEqual("6");

    const { className } = day.props;
    expect(className).toContain("date");
    expect(className).toContain("active");
    expect(className).toContain("today");
    expect(className).toContain("selected");
});

test("render multiple days", () => {
    const model = [{
        date: new Date(2019, 4, 31),
        isActiveMonth: false,
        isSelected: false,
        isToday: false,
    }, {
        date: new Date(2019, 5, 1),
        isActiveMonth: true,
        isSelected: true,
        isToday: true,
    }];

    const week = create(<Week week={model}/>).toJSON();
    const [first, second] = week.children;

    let className = first.props.className;
    expect(className).toEqual("date");
    expect(first.children).toContainEqual("31");

    className = second.props.className;
    expect(className).toContain("date");
    expect(className).toContain("active");
    expect(className).toContain("today");
    expect(className).toContain("selected");
    expect(second.children).toContainEqual("1");
});

test("render multiple weeks", () => {
    const model = [
    [
        {
            date: new Date(2019, 4,  31),
            isActiveMonth: false,
            isSelected: false,
            isToday: false,
        },
    ], [
        {
            date: new  Date(2019, 5, 1),
            isActiveMonth: true,
            isSelected: true,
            isToday: true,
        },
    ]];

    const calendar = create(<Calendar calendar={model}/>).toJSON();
    expect(calendar.props.className).toEqual("calendar");
    expect(calendar.children.length).toEqual(2);

    const [first, second] = calendar.children;
    expect(first.props.className).toEqual("week");
    expect(first.children.length).toEqual(1);

    expect(second.props.className).toEqual("week");
    expect(second.children.length).toEqual(1);
});

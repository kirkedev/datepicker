import * as tslib_1 from "tslib";
import React from "react";
import { create } from "react-test-renderer";
import { Calendar, Week, Day } from "./view";
test("render a day", function () {
    var model = {
        date: new Date(2019, 5, 6),
        isActiveMonth: true,
        isSelected: true,
        isToday: true,
    };
    var day = create(React.createElement(Day, { day: model })).toJSON();
    expect(day.children).toContainEqual("6");
    var className = day.props.className;
    expect(className).toContain("date");
    expect(className).toContain("active");
    expect(className).toContain("today");
    expect(className).toContain("selected");
});
test("render multiple days", function () {
    var model = [{
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
    var week = create(React.createElement(Week, { week: model })).toJSON();
    var _a = tslib_1.__read(week.children, 2), first = _a[0], second = _a[1];
    expect(first.children).toContainEqual("31");
    expect(second.children).toContainEqual("1");
    var className = first.props.className;
    expect(className).toEqual("date");
    expect(className).not.toContainEqual("active");
    expect(className).not.toContainEqual("today");
    expect(className).not.toContainEqual("selected");
    className = second.props.className;
    expect(className).toContain("date");
    expect(className).toContain("active");
    expect(className).toContain("today");
    expect(className).toContain("selected");
});
test("render multiple weeks", function () {
    var model = [
        [
            {
                date: new Date(2019, 4, 31),
                isActiveMonth: false,
                isSelected: false,
                isToday: false,
            },
        ], [
            {
                date: new Date(2019, 5, 1),
                isActiveMonth: true,
                isSelected: true,
                isToday: true,
            },
        ]
    ];
    var calendar = create(React.createElement(Calendar, { calendar: model })).toJSON();
    expect(calendar.props.className).toEqual("calendar");
    expect(calendar.children.length).toEqual(2);
    var _a = tslib_1.__read(calendar.children, 2), first = _a[0], second = _a[1];
    expect(first.props.className).toEqual("week");
    expect(first.children.length).toEqual(1);
    expect(second.props.className).toEqual("week");
    expect(second.children.length).toEqual(1);
});

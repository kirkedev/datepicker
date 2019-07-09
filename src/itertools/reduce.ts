import { Predicate, UnaryOperator, BinaryOperator } from "./index";
import { filter } from "./filter";
import { map } from "./map";

export function reduce<T, R>(iterable: Iterable<T>, operator: BinaryOperator<T, R>, value: R): R {
    for (const item of iterable) {
        value = operator(value, item);
    }

    return value;
}

export const count = <T>(iterable: Iterable<T>): number =>
    reduce(iterable, total => ++total, 0);

export const countIf = <T>(iterable: Iterable<T>, predicate: Predicate<T>): number =>
    count(filter(iterable, predicate));

export const sum = (iterable: Iterable<number>): number =>
    reduce(iterable, (value, item) => value + item, 0);

export const sumBy = <T>(iterable: Iterable<T>, operator: UnaryOperator<T, number>): number =>
    sum(map(iterable, operator));

export function none<T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean {
    for (const item of iterable) {
        if (predicate(item)) return false;
    }

    return true;
}

export function any<T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean {
    for (const item of iterable) {
        if (predicate(item)) return true;
    }

    return false;
}

export const all = <T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean =>
    none(iterable, (item) => !predicate(item));

import { Predicate, UnaryOperator, BinaryOperator } from "./index";
import { filter } from "./filter";
import { map } from "./map";
import { last } from "./slice";

export function* accumulate<T, R>(iterable: Iterable<T>, operator: BinaryOperator<T, R>, value: R): Iterable<R> {
    for (const item of iterable) {
        value = operator(value, item);
        yield value;
    }
}

export const reduce = <T, R>(iterable: Iterable<T>, operator: BinaryOperator<T, R>, value: R): R =>
    last(accumulate(iterable, operator, value));

export const sum = (iterable: Iterable<number>): number =>
    reduce(iterable, (value, item) => value + item, 0);

export const sumBy = <T>(iterable: Iterable<T>, operator: UnaryOperator<T, number>): number =>
    sum(map(iterable, operator));

export const count = <T>(iterable: Iterable<T>): number =>
    sumBy(iterable, () => 1);

export const countIf = <T>(iterable: Iterable<T>, predicate: Predicate<T>): number =>
    sumBy(iterable, item => predicate(item) ? 1 : 0);

export function none<T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean {
    for (const item of iterable) {
        if (predicate(item)) return false;
    }

    return true;
}

export function some<T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean {
    for (const item of iterable) {
        if (predicate(item)) return true;
    }

    return false;
}

export const all = <T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean =>
    none(iterable, (item) => !predicate(item));

export const one = <T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean =>
    Array.from(filter(iterable, predicate)).length === 1;

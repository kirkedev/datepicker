import { filter } from "./filter";
import { map } from "./map";
import { Predicate, UnaryOperator, BinaryOperator } from "./index";

export function reduce<T, R> (iterable: Iterable<T>, operator: BinaryOperator<T, R>, value: R): R {
    for (const item of iterable) {
        value = operator(value, item);
    }

    return value;
}

export const count = <T> (iterable: Iterable<T>) =>
    reduce(iterable, (count) => ++count, 0);

export const countIf = <T> (iterable: Iterable<T>, predicate: Predicate<T>) =>
    count(filter(iterable, predicate));

export const sum = <T> (iterable: Iterable<number>) =>
    reduce(iterable, (value, item) => value + item, 0);

export const sumBy = <T> (iterable: Iterable<T>, operator: UnaryOperator<T, number>) =>
    sum(map(iterable, operator));

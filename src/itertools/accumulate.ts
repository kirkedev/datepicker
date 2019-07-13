import { UnaryOperator, Predicate, Accumulator } from "./index";
import { drop } from "./drop";
import { filter, find } from "./filter";
import { map } from "./map";
import { first, last } from "./slice";

export function* accumulate<T, R>(iterable: Iterable<T>, operator: Accumulator<T, R>, value: R): Iterable<R> {
    for (const item of iterable) {
        yield value = operator(value, item);
    }
}

export const reduce = <T, R>(iterable: Iterable<T>, operator: Accumulator<T, R>, value: R): R =>
    last(accumulate(iterable, operator, value));

export const sum = (iterable: Iterable<number>): number =>
    reduce(iterable, (value, item) => value + item, 0);

export const sumBy = <T>(iterable: Iterable<T>, operator: UnaryOperator<T, number>): number =>
    sum(map(iterable, operator));

export const count = <T>(iterable: Iterable<T>): number =>
    reduce(iterable, total => ++total, 0);

export const countIf = <T>(iterable: Iterable<T>, predicate: Predicate<T>): number =>
    count(filter(iterable, predicate));

export const none = <T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean =>
    find(iterable, predicate) === undefined;

export const some = <T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean =>
    !none(iterable, predicate);

export const all = <T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean =>
    none(iterable, item => !predicate(item));

export const one = <T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean =>
    first(drop(filter(iterable, predicate), 1)) === undefined;

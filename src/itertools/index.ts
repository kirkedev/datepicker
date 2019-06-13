import { drop } from "./drop";
import { take } from "./take";
import { map } from "./map";
import { filter } from "./filter";

export type Predicate<T> = (item: T) => boolean;
export type UnaryOperator<T, R> = (item: T) => R;
export type BinaryOperator<T, R> = (last: R, item: T) => R;

export { chunk } from './chunk';
export { drop, dropWhile, dropUntil } from './drop';
export { filter, find } from './filter';
export { indexed } from './indexed';
export { map } from './map';
export { partition } from './partition';
export { reduce, count, countIf, sum, sumBy, all, none, any } from './reduce';
export { take, takeWhile, takeUntil } from './take';

export const slice = <T> (iterable: Iterable<T>, start: number, end: number) =>
    take(drop(iterable, start - 1), end - start);

export const first = <T> (iterable: Iterable<T>) =>
    iterable[Symbol.iterator]().next().value;

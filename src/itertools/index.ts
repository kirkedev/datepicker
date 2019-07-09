export type Predicate<T> = (item: T) => boolean;
export type UnaryOperator<T, R> = (item: T) => R;
export type BinaryOperator<T, R> = (last: R, item: T) => R;

export { chunk } from "./chunk";
export { drop, dropWhile, dropUntil } from "./drop";
export { filter, find } from "./filter";
export { flatten } from "./flatten";
export { enumerate } from "./enumerate";
export { map, flatMap } from "./map";
export { reduce, count, countIf, sum, sumBy, all, none, any } from "./reduce";
export { first, last, slice } from "./slice";
export { take, takeWhile, takeUntil } from "./take";
export { zip } from "./zip";

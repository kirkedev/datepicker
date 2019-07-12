export type UnaryOperator<T, R> = (item: T) => R;
export type BinaryOperator<T, R> = (last: R, item: T) => R;
export type Predicate<T> = UnaryOperator<T, boolean>;

export { chunk } from "./chunk";
export { drop, dropWhile, dropUntil } from "./drop";
export { filter, find } from "./filter";
export { flatten } from "./flatten";
export { enumerate } from "./enumerate";
export { map, flatMap } from "./map";
export { reduce, count, countIf, sum, sumBy, all, none, some, one } from "./reduce";
export { first, last, elementAt, slice } from "./slice";
export { take, takeWhile, takeUntil } from "./take";
export { zip } from "./zip";

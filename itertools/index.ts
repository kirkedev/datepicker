export type UnaryOperator<T, R> = (item: T) => R;
export type Predicate<T> = UnaryOperator<T, boolean>;
export type BinaryOperator<T, U, R> = (first: T, second: U) => R;
export type Accumulator<T, R> = BinaryOperator<R, T, R>;
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export { accumulate, count, countIf, sum, sumBy, all, none, reduce, some, one } from "./accumulate";
export { chunk } from "./chunk";
export { drop, dropWhile, dropUntil } from "./drop";
export { filter, find } from "./filter";
export { flatten } from "./flatten";
export { enumerate } from "./enumerate";
export { map, flatMap } from "./map";
export { first, last, elementAt, slice } from "./slice";
export { take, takeWhile, takeUntil } from "./take";
export { zip } from "./zip";

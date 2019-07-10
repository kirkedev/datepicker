import { drop } from "./drop";
import { take } from "./take";

export const slice = <T>(iterable: Iterable<T>, start: number, end?: number): Iterable<T> =>
    end === undefined ? drop(iterable, start) : take(drop(iterable, start), end - start);

export const first = <T>(iterable: Iterable<T>): T =>
    iterable[Symbol.iterator]().next().value;

export function last<T>(iterable: Iterable<T>): T {
    const iterator = iterable[Symbol.iterator]();
    let result = iterator.next();
    let value = result.value;

    while (!result.done) {
        value = result.value;
        result = iterator.next();
    }

    return value;
}

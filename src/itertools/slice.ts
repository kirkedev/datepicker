import { drop } from "./drop";
import { take } from "./take";

export const slice = <T> (iterable: Iterable<T>, start: number, end: number) =>
    take(drop(iterable, start), end - start - 1);

export const first = <T> (iterable: Iterable<T>) =>
    iterable[Symbol.iterator]().next().value;

export function last<T>(iterable: Iterable<T>) {
    const iterator = iterable[Symbol.iterator]();
    let result = iterator.next();

    while (!result.done) {
        result = iterator.next();
    }

    return result.value;
}

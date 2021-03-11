import { enumerate } from "./enumerate";
import { map } from "./map";
import type { Predicate } from ".";

function* dropElements<T>(iterator: Iterator<T>, predicate: Predicate<T>): Iterator<T> {
    let result = iterator.next();

    while (!result.done && predicate(result.value)) {
        result = iterator.next();
    }

    while (!result.done) {
        yield result.value;
        result = iterator.next();
    }
}

class DropFromIterable<T> implements Iterable<T> {
    public constructor(
        private readonly iterable: Iterable<T>,
        private readonly predicate: Predicate<T>) {}

    public [Symbol.iterator] = (): Iterator<T> =>
        dropElements(this.iterable[Symbol.iterator](), this.predicate);
}

export const dropUntil = <T>(iterable: Iterable<T>, predicate: Predicate<T>): Iterable<T> =>
    new DropFromIterable(iterable, item => !predicate(item));

export const dropWhile = <T>(iterable: Iterable<T>, predicate: Predicate<T>): Iterable<T> =>
    new DropFromIterable(iterable, predicate);

export const drop = <T>(iterable: Iterable<T>, count: number): Iterable<T> =>
    map(dropWhile(enumerate(iterable), ([index]) => index < count), ([, value]) => value);

import { Predicate } from "./index";
import { enumerate } from "./enumerate";
import { map } from "./map";

export function* takeElements<T>(iterator: Iterator<T>, predicate: Predicate<T>): Iterator<T> {
    let { done, value } = iterator.next();

    while (!done && predicate(value)) {
        yield value;

        const result = iterator.next();
        done = result.done;
        value = result.value;
    }
}

class TakeFromIterable<T> implements Iterable<T> {
    public constructor(
        private readonly iterable: Iterable<T>,
        private readonly predicate: Predicate<T>) {}

    public [Symbol.iterator] = () =>
        takeElements(this.iterable[Symbol.iterator](), this.predicate)
}

export const takeUntil = <T>(iterable: Iterable<T>, predicate: Predicate<T>): Iterable<T> =>
    new TakeFromIterable(iterable, (item) => !predicate(item));

export const takeWhile = <T>(iterable: Iterable<T>, predicate: Predicate<T>): Iterable<T> =>
    new TakeFromIterable(iterable, predicate);

export const take = <T>(iterable: Iterable<T>, count: number): Iterable<T> =>
    map(takeWhile(enumerate(iterable), ([index]) => index < count), ([, value]) => value);

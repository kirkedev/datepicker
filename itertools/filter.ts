import { Predicate } from "./index";
import { first } from "./slice";

function* filterElements<T>(iterator: Iterator<T>, predicate: Predicate<T>): Iterator<T> {
    let result = iterator.next();

    while (!result.done) {
        const value = result.value;
        if (predicate(value)) yield value;
        result = iterator.next();
    }
}

class FilteredIterable<T> implements Iterable<T> {
    public constructor(
        private readonly iterable: Iterable<T>,
        private readonly predicate: Predicate<T>) {}

    public [Symbol.iterator] = (): Iterator<T> =>
        filterElements(this.iterable[Symbol.iterator](), this.predicate)
}

export const filter = <T>(iterable: Iterable<T>, predicate: Predicate<T>): Iterable<T> =>
    new FilteredIterable(iterable, predicate);

export const find = <T>(iterable: Iterable<T>, predicate: Predicate<T>): T =>
    first(filter(iterable, predicate));

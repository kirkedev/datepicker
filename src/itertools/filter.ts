import { Predicate } from './index';

function* filterElements<T>(iterator: Iterator<T>, predicate: Predicate<T>): Iterator<T> {
    let result = iterator.next();

    while (!result.done) {
        const value = result.value;
        if (predicate(value)) yield value;
        result = iterator.next();
    }
}

class FilteredIterable<T> implements Iterable<T> {
    iterable: Iterable<T>;
    predicate: Predicate<T>;

    constructor(iterable: Iterable<T>, predicate: Predicate<T>) {
        this.iterable = iterable;
        this.predicate = predicate;
    }

    [Symbol.iterator] = () => filterElements(this.iterable[Symbol.iterator](), this.predicate);
}

export const filter = <T> (iterable: Iterable<T>, predicate: Predicate<T>) =>
    new FilteredIterable(iterable, predicate);

export function find<T>(iterable: Iterable<T>, predicate: Predicate<T>): T | null {
    const matches = filterElements(iterable[Symbol.iterator](), predicate);
    const { done, value } = matches.next();
    return done ? null : value;
}

import { Predicate } from './index';
import { map } from './map';
import { indexed } from './indexed';

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
    iterable: Iterable<T>;
    predicate: Predicate<T>;

    constructor(iterable: Iterable<T>, predicate: Predicate<T>) {
        this.iterable = iterable;
        this.predicate = predicate;
    }

    [Symbol.iterator] = () => dropElements(this.iterable[Symbol.iterator](), this.predicate);
}

export const dropUntil = <T> (iterable: Iterable<T>, predicate: Predicate<T>) =>
    new DropFromIterable(iterable, (item) => !predicate(item));

export const dropWhile = <T> (iterable: Iterable<T>, predicate: Predicate<T>) =>
    new DropFromIterable(iterable, predicate);

export const drop = <T> (iterable: Iterable<T>, count: number) =>
    map(dropWhile(indexed(iterable), ({index}) => index < count), ({value}) => value);

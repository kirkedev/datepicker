import { Predicate } from "./index";
import { indexed } from "./indexed";
import { map } from "./map";

function* takeElements<T>(iterator: Iterator<T>, predicate: Predicate<T>): Iterator<T> {
    let { done, value } = iterator.next();

    while (!done && predicate(value)) {
        yield value;

        const result = iterator.next();
        done = result.done;
        value = result.value;
    }
}

class TakeFromIterable<T> implements Iterable<T> {
    private readonly  iterable: Iterable<T>;
    private readonly  predicate: Predicate<T>;

    constructor(iterable: Iterable<T>, predicate: Predicate<T>) {
        this.iterable = iterable;
        this.predicate = predicate;
    }

    public [Symbol.iterator] = () => takeElements(this.iterable[Symbol.iterator](), this.predicate);
}

export const takeUntil = <T> (iterable: Iterable<T>, predicate: Predicate<T>) =>
    new TakeFromIterable(iterable, (item) => !predicate(item));

export const takeWhile = <T> (iterable: Iterable<T>, predicate: Predicate<T>) =>
    new TakeFromIterable(iterable, predicate);

export const take = <T> (iterable: Iterable<T>, count: number) =>
    map(takeWhile(indexed(iterable), ({index}) => index < count), ({value}) => value);

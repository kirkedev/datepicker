export interface IndexedValue<T> {
    index: number;
    value: T;
}

function* indexElements<T>(iterator: Iterator<T>): Iterator<IndexedValue<T>> {
    let index = 0;
    let result = iterator.next();

    while (!result.done) {
        yield { value: result.value, index };
        result = iterator.next();
        index++;
    }
}

class IndexedIterable<T> implements Iterable<IndexedValue<T>> {
    private readonly iterable: Iterable<T>;

    constructor(iterable: Iterable<T>) {
        this.iterable = iterable;
    }

    public [Symbol.iterator] = () => indexElements(this.iterable[Symbol.iterator]());
}

export const indexed = <T> (iterable: Iterable<T>) => new IndexedIterable(iterable);

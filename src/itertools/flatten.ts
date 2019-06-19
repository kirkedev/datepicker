function* flattenElements<T>(iterator: Iterator<Iterable<T>>) {
    let result = iterator.next();

    while (!result.done) {
        for (const item of result.value) {
            yield item;
        }

        result = iterator.next();
    }
}

class FlattenedIterable<T> implements Iterable<T> {
    private readonly iterable: Iterable<Iterable<T>>;

    constructor(iterable: Iterable<Iterable<T>>) {
        this.iterable = iterable;
    }

    public [Symbol.iterator] = () => flattenElements(this.iterable[Symbol.iterator]());
}

export const flatten = <T> (iterable: Iterable<Iterable<T>>) => new FlattenedIterable(iterable);

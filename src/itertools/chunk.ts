function* chunkElements<T>(iterator: Iterator<T>, size: number): Iterator<T[]> {
    let result = iterator.next();
    const group = new Array(size);

    while (!result.done) {
        let index = 0;

        while (!result.done && index < size) {
            group[index++] = result.value;
            result = iterator.next();
        }

        yield group.slice(0, index);
    }
}

class ChunkedIterable<T> implements Iterable<T[]> {
    private readonly iterable: Iterable<T>;
    private readonly size: number;

    constructor(iterable: Iterable<T>, size: number) {
        this.iterable = iterable;
        this.size = size;
    }

    public [Symbol.iterator] = () => chunkElements(this.iterable[Symbol.iterator](), this.size);
}

export const chunk = <T, R> (iterable: Iterable<T>, size: number) => new ChunkedIterable(iterable, size);

function* chunkElements<T>(iterator: Iterator<T>, size: number): Iterator<Array<T>> {
    let result = iterator.next();
    let chunk = new Array(size);

    while (!result.done) {
        let index = 0;

        while (!result.done && index < size) {
            chunk[index++] = result.value;
            result = iterator.next();
        }

        yield chunk.slice(0, index);
    }
}

class ChunkedIterable<T> implements Iterable<Array<T>> {
    iterable: Iterable<T>;
    size: number;

    constructor(iterable: Iterable<T>, size: number) {
        this.iterable = iterable;
        this.size = size;
    }

    [Symbol.iterator] = () => chunkElements(this.iterable[Symbol.iterator](), this.size);
}

export const chunk = <T, R> (iterable: Iterable<T>, size: number) => new ChunkedIterable(iterable, size);

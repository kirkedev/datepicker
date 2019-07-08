import { UnaryOperator } from "./index";

function* partitionElements<T, R>(iterator: Iterator<T>, selector: UnaryOperator<T, R>): Iterator<T[]> {
    let last;
    let index = 0;
    let result = iterator.next();
    const group = [];

    while (!result.done) {
        const { value } = result;
        const current = selector(value);

        if (last !== undefined && current !== last) {
            yield group.slice(0, index);
            index = 0;
        }

        group[index++] = value;
        last = current;
        result = iterator.next();
    }

    yield group.slice(0, index);
}

class PartitionedIterable<T, R> implements Iterable<T[]> {
    public constructor(
        private readonly iterable: Iterable<T>,
        private readonly operator: UnaryOperator<T, R>) {}

    public [Symbol.iterator] = () =>
        partitionElements(this.iterable[Symbol.iterator](), this.operator)
}

export const partition = <T, R> (iterable: Iterable<T>, operator: UnaryOperator<T, R>) =>
    new PartitionedIterable(iterable, operator);

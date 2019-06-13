import { UnaryOperator } from './index';

function* partitionElements<T, R>(iterator: Iterator<T>, operator: UnaryOperator<T, R>): Iterator<Array<T>> {
    let last;
    let index = 0;
    let result = iterator.next();
    const group = [];

    while (!result.done) {
        const value = result.value;
        const current = operator(value);

        if (last !== undefined && current !== last) {
            yield group.slice(0, index);
            index = 0;
        }

        group[index++] = value;
        last = current;
        result = iterator.next();
    }

    yield group;
}

class PartitionedIterable<T, R> implements Iterable<Array<T>> {
    iterable: Iterable<T>;
    operator: UnaryOperator<T, R>;

    constructor(iterable: Iterable<T>, operator: UnaryOperator<T, R>) {
        this.iterable = iterable;
        this.operator = operator;
    }

    [Symbol.iterator] = () => partitionElements(this.iterable[Symbol.iterator](), this.operator);
}

export const partition = <T, R> (iterable: Iterable<T>, operator: UnaryOperator<T, R>) =>
    new PartitionedIterable(iterable, operator);

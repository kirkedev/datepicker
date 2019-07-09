import { UnaryOperator } from "./index";
import { flatten } from "./flatten";

function* mapElements<T, R>(iterator: Iterator<T>, operator: UnaryOperator<T, R>): Iterator<R> {
    let result = iterator.next();

    while (!result.done) {
        yield operator(result.value);
        result = iterator.next();
    }
}

class MappedIterable<T, R> implements Iterable<R> {
    public constructor(
        private readonly iterable: Iterable<T>,
        private readonly operator: UnaryOperator<T, R>) {}

    public [Symbol.iterator] = () =>
        mapElements(this.iterable[Symbol.iterator](), this.operator)
}

export const map = <T, R>(iterable: Iterable<T>, operator: UnaryOperator<T, R>): Iterable<R> =>
    new MappedIterable(iterable, operator);

export const flatMap = <T, R>(iterable: Iterable<Iterable<T>>, operator: UnaryOperator<T, R>): Iterable<R> =>
    map(flatten(iterable), operator);

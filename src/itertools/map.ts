import { UnaryOperator } from "./index";

function* mapElements<T, R>(iterator: Iterator<T>, operator: UnaryOperator<T, R>): Iterator<R> {
    let result = iterator.next();

    while (!result.done) {
        yield operator(result.value);
        result = iterator.next();
    }
}

class MappedIterable<T, R> implements Iterable<R> {
    private readonly iterable: Iterable<T>;
    private readonly operator: UnaryOperator<T, R>;

    constructor(iterable: Iterable<T>, operator: UnaryOperator<T, R>) {
        this.iterable = iterable;
        this.operator = operator;
    }

    public [Symbol.iterator] = () => mapElements(this.iterable[Symbol.iterator](), this.operator);
}

export const map = <T, R> (iterable: Iterable<T>, operator: UnaryOperator<T, R>) =>
    new MappedIterable(iterable, operator);

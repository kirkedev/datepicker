import React, { createContext, useContext, useState } from "react";
import { DatePickerViewModel, selectDate, nextMonth, previousMonth } from "../viewmodel";
import type { ReactNode } from "react";
import type { Optional } from "itertools";
import type { DatePickerProps } from ".";

interface Interactor {
    previous(): void;
    next(): void;
    select(date: Date): void;
    submit(): void;
}

interface Props extends DatePickerProps {
    children: ReactNode;
}

const InteractorContext = createContext<Optional<Interactor>>(undefined);
const ViewModelContext = createContext<Optional<DatePickerViewModel>>(undefined);

export function useInteractor(): Interactor {
    const interactor = useContext(InteractorContext);

    if (interactor === undefined) {
        throw new Error("Could not locate Interactor. Are you using a DatePickerProvider?");
    }

    return interactor;
}

export function useViewModel(): DatePickerViewModel {
    const model = useContext(ViewModelContext);

    if (model === undefined) {
        throw new Error("Could not locate ViewModel. Are you using a DatePickerProvider?");
    }

    return model;
}

export const useDatePicker = (): readonly [DatePickerViewModel, Interactor] =>
    [useViewModel(), useInteractor()] as const;

function DatePickerProvider({ month, year, onSelectDate, children }: Props): JSX.Element {
    const [model, render] = useState(new DatePickerViewModel(month, year));

    const interactor: Interactor = {
        previous: (): void => render(previousMonth),
        next: (): void => render(nextMonth),
        select: (date: Date): void => render(selectDate(date)),
        submit: (): void => onSelectDate(model.selected as Date)
    };

    return <ViewModelContext.Provider value={model}>
        <InteractorContext.Provider value={interactor}>
            {children}
        </InteractorContext.Provider>
    </ViewModelContext.Provider>;
}

export default DatePickerProvider;

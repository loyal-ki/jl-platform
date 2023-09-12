/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {useRef} from 'react';

export type Noop = (...args: any[]) => any;

export const usePersistFn = <T extends Noop>(fn: T) => {
    const fnRef = useRef<T>(fn);
    fnRef.current = fn;

    const persistFn = useRef<T>();

    if (!persistFn.current) {
        persistFn.current = function (this: T, ...args) {
            return fnRef.current?.apply(this, args);
        } as T;
    }

    return persistFn.current!;
};

import {useRef, useCallback, useEffect} from 'react';

export const useDestroyed = () => {
    const DestroyedRef = useRef(true);
    const getDestroyed = useCallback(() => DestroyedRef.current, []);

    useEffect(() => {
        DestroyedRef.current = false;

        return () => {
            DestroyedRef.current = true;
        };
    }, []);

    return getDestroyed;
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useIsFocused} from '@react-navigation/native';
import {useEffect, useRef} from 'react';
import {BackHandler, NativeEventSubscription} from 'react-native';

import {useMemoizedCallback} from './use-memoized-callback';

export const useBackPressCallback = (callback: () => boolean) => {
    const isFocused = useIsFocused();

    const backHandlerRef = useRef<NativeEventSubscription | undefined>();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const backAction = useMemoizedCallback(() => {
        if (isFocused) {
            return callback();
        }
        return false;
    }, [callback, isFocused]);
    const applicationFocus = useMemoizedCallback(() => {
        backHandlerRef.current?.remove();
        backHandlerRef.current = BackHandler.addEventListener('hardwareBackPress', backAction);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            backHandlerRef.current?.remove();
            backHandlerRef.current = BackHandler.addEventListener('hardwareBackPress', backAction);
        }, 500);
        return () => {
            backHandlerRef.current?.remove();
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [backAction]);
    useEffect(() => {
        applicationFocus();
        return () => {};
    }, [applicationFocus]);
};

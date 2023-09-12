import React, {createRef} from 'react';

import {portal} from '@components/portal/portal-host';

import Toast from './toast';

import type {ToastOptions, ToastType, ToastMethods} from './toast.props';

type OptionsMap = Record<ToastType, ToastOptions | undefined | null>;

const parseOptions = (message: ToastOptions | string) => {
    if (typeof message === 'object') {
        return message;
    }
    return {message};
};

const defaultOptions: ToastOptions = {
    type: 'text',
    duration: 2000,
    message: '',
    position: 'middle',
    forbidPress: false,
    closeOnPressOverlay: false,
    overlay: false,
    loadingType: 'spinner',
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
let defaultOptionsMap = {} as OptionsMap;

let currentOptions = {
    ...defaultOptions,
};

export const Instance = (options: ToastOptions | string) => {
    let opts: ToastOptions = typeof options === 'string' ? {message: options} : options;

    const type = opts.type || currentOptions.type;

    opts = {
        ...currentOptions,
        ...(type ? defaultOptionsMap[type] : {}),
        ...opts,
    };
    const ToastRef = createRef<ToastMethods>();

    const key = portal.add(
        <Toast
            {...opts}
            ref={ToastRef}
            onClosed={() => {
                portal.remove(key);
                opts.onClosed?.();
            }}
        />
    );

    return {
        close: () => {
            ToastRef.current?.close();
        },
        setMessage: (m: string) => {
            ToastRef.current?.setMessage(m);
        },
    };
};

export const loading = (options: ToastOptions | string) =>
    Instance({
        type: 'loading',
        ...parseOptions(options),
    });

export const success = (options: ToastOptions | string) =>
    Instance({
        type: 'success',
        ...parseOptions(options),
    });

export const fail = (options: ToastOptions | string) =>
    Instance({
        type: 'fail',
        ...parseOptions(options),
    });

export const setDefaultOptions = (type: ToastType | ToastOptions, options?: ToastOptions) => {
    if (typeof type === 'string') {
        defaultOptionsMap[type] = options;
    } else {
        Object.assign(currentOptions, type);
    }
};

export const resetDefaultOptions = (type: ToastType | ToastOptions) => {
    if (typeof type === 'string') {
        defaultOptionsMap[type] = null;
    } else {
        currentOptions = {...defaultOptions};
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        defaultOptionsMap = {} as OptionsMap;
    }
};

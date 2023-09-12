import {PopupPropsCommon} from '@components/popup/popup.props';

import type React from 'react';

export type ToastType = 'text' | 'loading' | 'success' | 'fail' | 'icon';

export type ToastMethods = {
    close: () => void;
    setMessage: (s: string) => void;
};

export interface ToastProps
    extends Omit<PopupPropsCommon, 'visible' | 'duration' | 'closeOnPressOverlay'> {
    type?: ToastType;
    position?: 'top' | 'bottom' | 'middle';
    message?: string;
    overlay?: boolean;
    forbidPress?: boolean;
    closeOnPress?: boolean;
    closeOnPressOverlay?: boolean;
    loadingType?: 'circular' | 'spinner';
    duration?: number;
    icon?: React.ReactNode;
}

export type ToastOptions = ToastProps;

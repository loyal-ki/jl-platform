/* eslint-disable @typescript-eslint/ban-types */
// import type React from 'react'
import type {PropsWithChildren} from 'react';
import type {ViewStyle, StyleProp} from 'react-native';

export type PopupPosition = 'top' | 'bottom' | 'right' | 'left' | 'center';

type PopupPropsCommonCallback = () => void;

export interface PopupPropsCommon {
    visible: boolean;
    duration?: number;
    overlay?: boolean;
    closeOnPressOverlay?: boolean;
    onPressOverlay?: PopupPropsCommonCallback;
    onOpen?: PopupPropsCommonCallback;
    onOpened?: PopupPropsCommonCallback;
    onClose?: PopupPropsCommonCallback;
    onClosed?: PopupPropsCommonCallback;
    onRequestClose?: () => boolean;
    testID?: string | undefined;
}

export interface PopupProps extends PopupPropsCommon, PropsWithChildren<{}> {
    style?: StyleProp<ViewStyle>;
    position?: PopupPosition;
    round?: boolean;
    safeAreaInsetBottom?: boolean;
    lazyRender?: boolean;
    destroyOnClosed?: boolean;
}

export interface PopupPageProps extends Omit<PopupProps, 'position'> {
    safeAreaInsetTop?: number;
}

export type State = {
    visible: boolean;
    overlayVisible: boolean;
    zIndex: number;
    lazyRender: boolean;
};

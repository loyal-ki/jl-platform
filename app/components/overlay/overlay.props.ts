/* eslint-disable @typescript-eslint/ban-types */
import type {PropsWithChildren} from 'react';
import type {ViewStyle, StyleProp, ColorValue, ViewProps} from 'react-native';

export interface OverlayProps extends PropsWithChildren<{}>, Pick<ViewProps, 'testID'> {
    style?: StyleProp<ViewStyle>;
    visible: boolean;
    zIndex?: number;
    duration?: number;
    onPress?: () => void;
    onRequestClose?: () => boolean;
    backgroundColor?: ColorValue;
}

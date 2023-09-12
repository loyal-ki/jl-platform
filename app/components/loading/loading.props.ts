import type {TextStyle, StyleProp, ColorValue, ViewProps} from 'react-native';

export interface LoadingProps extends ViewProps {
    textStyle?: StyleProp<TextStyle>;
    color?: ColorValue;
    type?: 'spinner' | 'circular';
    size?: number;
    textSize?: number;
    vertical?: boolean;
}

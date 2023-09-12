import type {TextStyle, ViewStyle, StyleProp, ColorValue, ViewProps} from 'react-native';

export interface BadgeProps extends ViewProps {
    countStyle?: StyleProp<ViewStyle>;
    countTextStyle?: StyleProp<TextStyle>;
    count?: number | string;
    color?: ColorValue;
    dot?: boolean;
    max?: number;
    loading?: boolean;
    showZero?: boolean;
    offset?: [number, number];
    status?: 'primary' | 'success' | 'warning' | 'error';
}

import type {ColorValue, ViewProps} from 'react-native';

export interface ProgressProps extends Pick<ViewProps, 'testID'> {
    percentage?: number;
    strokeWidth?: number;
    color?: ColorValue;
    trackColor?: ColorValue;
    pivotText?: string;
    pivotColor?: ColorValue;
    textColor?: ColorValue;
    inactive?: boolean;
    showPivot?: boolean;
    square?: boolean;
    animated?: boolean;
    animationDuration?: number;
    onAnimationEnd?: (percentage: number) => void;
}

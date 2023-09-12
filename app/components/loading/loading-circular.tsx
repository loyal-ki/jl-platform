/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable react/react-in-jsx-scope */
import {defaultTo} from 'lodash';
import {memo, useMemo, useRef} from 'react';
import {Animated, ColorValue, ViewProps, ViewStyle} from 'react-native';
import Svg, {Circle, CircleProps} from 'react-native-svg';

import {IconColor, IconSize} from './loading.configs';
import useLoop from './useLoop';

const AnimatedCircle = Animated.createAnimatedComponent<React.ComponentType<CircleProps>>(Circle);

export interface CircularProps extends ViewProps {
    size?: number | undefined;
    color?: ColorValue | undefined;
}

const STROKE_WIDTH = 2;

const LoadingCircular: React.FC<CircularProps> = ({size, color, ...restProps}) => {
    const iconColor = defaultTo(color, IconColor);
    const iconSize = defaultTo(size, IconSize);

    const AnimatedCircle0Value = useRef(new Animated.Value(0)).current;
    const AnimatedCircle1Value = useRef(new Animated.Value(0)).current;
    const AnimatedCircle2Value = useRef(new Animated.Value(0)).current;

    const circle1Props = useMemo(() => {
        const center = Math.floor(iconSize / 2);
        const radios = Math.floor(center - STROKE_WIDTH / 2);

        return {
            cy: center,
            cx: center,
            r: radios,
        };
    }, [iconSize]);

    const circle2Props = useMemo(() => {
        const center = Math.floor(iconSize / 2);
        const radios = Math.floor(center - STROKE_WIDTH / 2 - center / 2);

        return {
            cy: center,
            cx: center,
            r: radios,
        };
    }, [iconSize]);

    const half1Circle = useMemo(() => circle1Props.r * Math.PI, [circle1Props.r]);
    const half2Circle = useMemo(() => circle2Props.r * Math.PI, [circle2Props.r]);

    useLoop(AnimatedCircle0Value, 0, {
        toValue: 1,
        duration: 800,
    });

    useLoop(AnimatedCircle1Value, half1Circle, {
        toValue: -half1Circle * 2,
        duration: 800 * 1.5,
    });

    useLoop(AnimatedCircle2Value, half2Circle, {
        toValue: -half2Circle * 2,
        duration: 800 * 2.5,
    });

    const iconStyle: ViewStyle = {
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
        transform: [
            {
                rotateZ: AnimatedCircle0Value.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['-90deg', '270deg'],
                }) as never,
            },
        ],
    };

    return (
        <Animated.View {...restProps} style={[iconStyle, restProps.style]}>
            <Svg width="100%" height="100%">
                <AnimatedCircle
                    {...circle1Props}
                    stroke={iconColor}
                    strokeWidth={STROKE_WIDTH}
                    strokeDasharray={`${half1Circle},${half1Circle * 2}`}
                    strokeLinecap="round"
                    strokeDashoffset={AnimatedCircle1Value}
                    fill="none"
                />

                <AnimatedCircle
                    {...circle2Props}
                    stroke={iconColor}
                    strokeWidth={STROKE_WIDTH}
                    strokeDasharray={`${half2Circle},${half2Circle * 2}`}
                    strokeLinecap="round"
                    strokeDashoffset={AnimatedCircle2Value}
                    fill="none"
                />
            </Svg>
        </Animated.View>
    );
};
export default memo(LoadingCircular);

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import {memo, useRef} from 'react';
import {Animated, ColorValue, Easing, StyleSheet, View, ViewProps} from 'react-native';

import useLoop from './useLoop';

export interface SpinnerProps extends ViewProps {
    size?: number;
    color?: ColorValue;
}

const PETAL_COUNT = 8;
const PETALS = new Array(PETAL_COUNT).fill(0);
const A_OPACITY = 1 / PETAL_COUNT;
const A_ROTATE = 360 / PETAL_COUNT;

const styles = StyleSheet.create({
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },

    petal: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
    },

    inner: {
        width: 2,
        height: '30%',
        borderRadius: 1,
    },
});

const LoadingSpinner: React.FC<SpinnerProps> = ({size = 24, color = '#5A6068', ...restProps}) => {
    const AnimatedSpinnerValue = useRef(new Animated.Value(0)).current;

    useLoop(AnimatedSpinnerValue, 0, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
    });

    return (
        <Animated.View
            {...restProps}
            style={[
                styles.icon,
                {
                    width: size,
                    height: size,
                    transform: [
                        {
                            rotateZ: AnimatedSpinnerValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg'],
                            }),
                        },
                    ],
                },
                restProps.style,
            ]}>
            {PETALS.map((_, i) => {
                return (
                    <View
                        key={i}
                        style={StyleSheet.flatten([
                            styles.petal,
                            {
                                opacity: A_OPACITY * (i + 1),
                                transform: [
                                    {
                                        rotate: `${A_ROTATE * i}deg`,
                                    },
                                ],
                            },
                        ])}>
                        <View
                            style={[
                                styles.inner,
                                {
                                    backgroundColor: color,
                                },
                            ]}
                        />
                    </View>
                );
            })}
        </Animated.View>
    );
};

export default memo(LoadingSpinner);

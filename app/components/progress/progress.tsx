/* eslint-disable no-param-reassign */
import {defaultTo} from 'lodash';
import React, {useState, useCallback, useRef, useEffect, memo} from 'react';
import {View, Text, Animated, Easing} from 'react-native';

import {usePersistFn} from '@app/hooks';

import {
    progressBackgroundColor,
    progressColor,
    progressHeight,
    progressPivotFontSize,
    progressPivotLineHeightScale,
    progressPivotPaddingHorizontal,
    progressPivotTextColor,
} from './progress.configs';

import type {ProgressProps} from './progress.props';
import type {LayoutChangeEvent, ViewStyle} from 'react-native';

type ViewLayout = {width: number; height: number};

const Progress: React.FC<ProgressProps> = ({
    testID,
    percentage = 0,
    pivotText,
    color,
    trackColor,
    pivotColor,
    textColor,
    strokeWidth,
    inactive = false,
    showPivot = true,
    square = false,
    animated = false,
    animationDuration,
    onAnimationEnd,
}) => {
    const AnimatedValue = useRef(new Animated.Value(0)).current;
    const StartPercentage = useRef(percentage);
    const onAnimationEndPersistFn = usePersistFn((n: number) => {
        onAnimationEnd?.(n);
    });

    color = defaultTo(color, progressColor);

    if (inactive) {
        color = '#CACACA';
    }

    trackColor = defaultTo(trackColor, progressBackgroundColor);
    pivotColor = defaultTo(pivotColor, color);
    textColor = defaultTo(textColor, progressPivotTextColor);
    pivotText = defaultTo(pivotText, `${percentage}%`);
    strokeWidth = defaultTo(strokeWidth, progressHeight);
    animationDuration = defaultTo(animationDuration, 300);

    const borderRadius = square ? 0 : strokeWidth / 2;

    const [progressLayout, setProgressLayout] = useState<ViewLayout>({
        width: 0,
        height: 0,
    });
    const [textLayout, setTextLayout] = useState<ViewLayout>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const action = Animated.timing(AnimatedValue, {
            toValue: (progressLayout.width * percentage) / 100,
            duration: animated ? animationDuration : 0,
            easing: Easing.bezier(0.55, 0.055, 0.675, 0.19),
            useNativeDriver: false,
        });

        action.start(({finished}) => {
            if (finished) {
                onAnimationEndPersistFn(percentage);
            }
        });

        return () => {
            action.stop();
        };
    }, [
        AnimatedValue,
        percentage,
        animationDuration,
        progressLayout.width,
        animated,
        onAnimationEndPersistFn,
    ]);

    const barStyle: ViewStyle = {
        position: 'absolute',
        left: 0,
        top: 0,
        width: AnimatedValue as unknown as number,
        height: strokeWidth,
        backgroundColor: color,
        borderRadius,
    };
    const textBoxStyle: ViewStyle = {
        position: 'absolute',
        left: AnimatedValue as unknown as number,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pivotColor,
        paddingHorizontal: progressPivotPaddingHorizontal,
        borderRadius: 9999,
        transform: [
            {
                translateX: -textLayout.width / 2,
            },
            {
                translateY: -(textLayout.height - strokeWidth) / 2,
            },
        ],
    };

    const onLayoutProgress = useCallback(
        (e: LayoutChangeEvent) => {
            AnimatedValue.setValue((e.nativeEvent.layout.width * StartPercentage.current) / 100);
            setProgressLayout(e.nativeEvent.layout);
        },
        [AnimatedValue]
    );

    const onLayoutText = useCallback((e: LayoutChangeEvent) => {
        setTextLayout(e.nativeEvent.layout);
    }, []);

    return (
        <View
            testID={testID}
            onLayout={onLayoutProgress}
            style={{
                height: strokeWidth,
                backgroundColor: trackColor,
                borderRadius,
            }}>
            <Animated.View style={barStyle} />
            {showPivot ? (
                <Animated.View onLayout={onLayoutText} style={textBoxStyle}>
                    <Text
                        style={{
                            color: textColor,
                            fontSize: progressPivotFontSize,
                            lineHeight: progressPivotLineHeightScale * progressPivotFontSize,
                        }}>
                        {pivotText}
                    </Text>
                </Animated.View>
            ) : null}
        </View>
    );
};

export default memo(Progress);

/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-bitwise */
import React from 'react';
import {View, ViewProps, StyleSheet, ScrollView, StyleProp, ViewStyle} from 'react-native';
import {EdgeInsets, SafeAreaConsumer} from 'react-native-safe-area-context';

import {AppCommonStyles} from '@app/utils';

const TOP = 0b1000;
const RIGHT = 0b0100;
const BOTTOM = 0b0010;
const LEFT = 0b0001;
const ALL = 0b1111;
export type SimpleSafeAreaViewEdge = 'top' | 'right' | 'bottom' | 'left';
const edgeBitmaskMap: Record<SimpleSafeAreaViewEdge, number> = {
    top: TOP,
    right: RIGHT,
    bottom: BOTTOM,
    left: LEFT,
};
export type SimpleSafeAreaViewProps = ViewProps & {
    children?: React.ReactNode;
    mode?: 'padding' | 'margin';
    edges?: ReadonlyArray<SimpleSafeAreaViewEdge>;
    bottomInsetIfZero?: number;
};
const calculate = (
    {style = {}, mode, edges, bottomInsetIfZero = 0}: SimpleSafeAreaViewProps,
    insets: EdgeInsets | null
) => {
    const edgeBitmask =
        edges != null ? edges.reduce((accum, edge) => accum | edgeBitmaskMap[edge], 0) : ALL;
    const appliedStyleFunction = () => {
        const insetTop = edgeBitmask & TOP ? insets?.top ?? 0 : 0;
        const insetRight = edgeBitmask & RIGHT ? insets?.right ?? 0 : 0;
        const insetLeft = edgeBitmask & LEFT ? insets?.left ?? 0 : 0;
        let insetBottom = edgeBitmask & BOTTOM ? insets?.bottom ?? 0 : 0;
        if (bottomInsetIfZero && insets?.bottom === 0) {
            insetBottom += bottomInsetIfZero;
        }
        const flatStyle = StyleSheet.flatten(style) as Record<string, number>;
        if (mode === 'margin') {
            const {
                margin = 0,
                marginVertical = margin,
                marginHorizontal = margin,
                marginTop = marginVertical,
                marginRight = marginHorizontal,
                marginBottom = marginVertical,
                marginLeft = marginHorizontal,
            } = flatStyle;
            const marginStyle = {
                marginTop: marginTop + insetTop,
                marginRight: marginRight + insetRight,
                marginBottom: marginBottom + insetBottom,
                marginLeft: marginLeft + insetLeft,
            };
            return [style, marginStyle];
        }
        const {
            padding = 0,
            paddingVertical = padding,
            paddingHorizontal = padding,
            paddingTop = paddingVertical,
            paddingRight = paddingHorizontal,
            paddingBottom = paddingVertical,
            paddingLeft = paddingHorizontal,
        } = flatStyle;
        const paddingStyle = {
            paddingTop: paddingTop + insetTop,
            paddingRight: paddingRight + insetRight,
            paddingBottom: paddingBottom + insetBottom,
            paddingLeft: paddingLeft + insetLeft,
        };
        return [style, paddingStyle];
    };
    return appliedStyleFunction();
};
export const SimpleSafeAreaView: React.FC<SimpleSafeAreaViewProps> = ({
    style = {},
    mode,
    edges,
    bottomInsetIfZero,
    ...rest
}) => {
    return (
        <SafeAreaConsumer>
            {insets => {
                const appliedStyle = calculate({style, mode, edges, bottomInsetIfZero}, insets);
                return <View style={appliedStyle} {...rest} />;
            }}
        </SafeAreaConsumer>
    );
};
export type SimpleSafeAreaScrollViewProps = ViewProps & {
    children?: React.ReactNode;
    mode?: 'padding' | 'margin';
    edges?: ReadonlyArray<SimpleSafeAreaViewEdge>;
    bottomInsetIfZero?: number;
    containerStyle: StyleProp<ViewStyle>;
};
export const SimpleSafeAreaScrollView: React.FC<SimpleSafeAreaScrollViewProps> = ({
    style = AppCommonStyles.emptyStyle,
    mode = 'padding',
    edges,
    bottomInsetIfZero,
    containerStyle,
    ...rest
}) => {
    return (
        <SafeAreaConsumer>
            {insets => {
                const appliedStyle = calculate({style, mode, edges, bottomInsetIfZero}, insets);
                return (
                    <ScrollView
                        style={containerStyle}
                        contentInsetAdjustmentBehavior="always"
                        contentContainerStyle={appliedStyle}
                        showsVerticalScrollIndicator={false}
                        {...rest}
                    />
                );
            }}
        </SafeAreaConsumer>
    );
};

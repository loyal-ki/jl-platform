/* eslint-disable no-param-reassign */
import isNil from 'lodash/isNil';
import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useTheme} from '@app/context';
import {makeStyleSheetFromTheme} from '@app/utils';

import {
    badgeBackgroundColor,
    badgeCountBorderRadius,
    badgeDotSize,
    badgeFontSize,
    badgeFontWeight,
    badgePaddingHorizontal,
    badgePaddingVertical,
    badgeSize,
} from './badge.config';
import {BadgeProps} from './badge.props';

import type {ViewStyle, StyleProp} from 'react-native';

export const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        count: {
            minWidth: badgeSize,
            borderRadius: badgeCountBorderRadius,
            paddingHorizontal: badgePaddingHorizontal,
            paddingVertical: badgePaddingVertical,
        },
        count_text: {
            color: theme.white,
            fontSize: badgeFontSize,
            fontWeight: badgeFontWeight,
            textAlign: 'center',
            height: badgeSize,
            lineHeight: badgeSize,
        },
        count_dot: {
            width: badgeDotSize,
            height: badgeDotSize,
            minWidth: 0,
        },
        count_fixed: {
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 2,
            transform: [
                {
                    translateX: badgeSize / 2,
                },
                {
                    translateY: -badgeSize / 2,
                },
            ],
        },
        count_dot_fixed: {
            transform: [
                {
                    translateX: badgeDotSize / 2,
                },
                {
                    translateY: -badgeDotSize / 2,
                },
            ],
        },
    })
);

const Badge: React.FC<BadgeProps> = ({
    children,
    count,
    dot,
    max,
    color,
    countStyle,
    countTextStyle,
    loading = false,
    showZero = false,
    offset,
    status,
    ...restProps
}) => {
    const {theme} = useTheme();

    const styles = getStyleSheet(theme);

    if (!isNil(max) && typeof count === 'number' && count > max) {
        count = `${max}+`;
    }

    const hasCount = !isNil(count) && (count === 0 ? showZero : true);

    const countstyles: StyleProp<ViewStyle> = [
        styles.count,
        {
            backgroundColor: color || badgeBackgroundColor,
        },
        dot ? styles.count_dot : null,
        !isNil(children)
            ? [
                  styles.count_fixed,
                  dot ? styles.count_dot_fixed : null,
                  offset
                      ? {
                            transform: [
                                {
                                    translateX: offset[0],
                                },
                                {
                                    translateY: offset[1],
                                },
                            ],
                        }
                      : null,
              ]
            : [],
        countStyle,
    ];

    const badgeJSX =
        !loading && (hasCount || dot) ? (
            <View style={countstyles}>
                {dot ? null : <Text style={[styles.count_text, countTextStyle]}>{count}</Text>}
            </View>
        ) : null;

    return (
        <View {...restProps} collapsable={false}>
            {badgeJSX}
            {children}
        </View>
    );
};

export default memo(Badge);

/* eslint-disable no-nested-ternary */
import {defaultTo} from 'lodash';
import isNil from 'lodash/isNil';
import React, {isValidElement, memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Circular from './loading-circular';
import Spinner from './loading-spinner';
import {FontSize, Gap, IconColor, IconSize} from './loading.configs';

import type {LoadingProps} from './loading.props';

const styles = StyleSheet.create({
    loading: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    loading_vertical: {
        flexDirection: 'column',
    },
});

const Loading: React.FC<LoadingProps> = ({
    children,
    style,
    textStyle,
    size,
    color,
    textSize,
    vertical = false,
    type = 'circular',

    ...restProps
}) => {
    const iconColor = defaultTo(color, IconColor);
    const iconSize = defaultTo(size, IconSize);

    const textJSX = !isNil(children) ? (
        isValidElement(children) ? (
            children
        ) : (
            <Text
                style={StyleSheet.flatten([
                    {
                        fontSize: textSize || FontSize,
                        color: color || IconColor,
                        marginLeft: vertical ? 0 : Gap,
                        marginTop: vertical ? Gap : 0,
                    },
                    textStyle,
                ])}>
                {children}
            </Text>
        )
    ) : null;

    return (
        <View
            {...restProps}
            style={StyleSheet.flatten([
                styles.loading,
                vertical ? styles.loading_vertical : null,
                style,
            ])}>
            {type === 'circular' ? (
                <Circular size={iconSize} color={iconColor} />
            ) : (
                <Spinner size={iconSize} color={iconColor} />
            )}
            {textJSX}
        </View>
    );
};

export default memo(Loading);

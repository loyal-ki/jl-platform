/* eslint-disable react/prop-types */
import {isEmpty} from 'lodash';
import React, {useMemo} from 'react';
import {View, StyleSheet, TextStyle, StyleProp, Text, ViewStyle} from 'react-native';

import {Spacing4} from '@app/components/alias';
import {makeStyleSheetFromTheme, typography} from '@app/utils';

export const getInputErrorMessageStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        textContainer: {
            marginTop: Spacing4,
            justifyContent: 'center',
            minHeight: 14,
        },
        textError: {
            ...typography.text12Regular,
            justifyContent: 'center',
            textAlignVertical: 'center',
            color: theme.error,
        },
        styleErrorMsg: {
            textAlign: 'left',
        },
    })
);

export interface IInputErrorMessageProps {
    text: string | undefined;
    marginTop?: number;
    styleErrorMsg?: StyleProp<TextStyle>;
    theme: Theme;
}
export const InputErrorMessage: React.FC<IInputErrorMessageProps> = ({
    text,
    marginTop = 4,
    styleErrorMsg,
    theme,
}: IInputErrorMessageProps) => {
    const styles = getInputErrorMessageStyleSheet(theme);

    const combinedStyleLine = useMemo(() => {
        const res: StyleProp<ViewStyle | TextStyle> = [styles.styleErrorMsg, styleErrorMsg];

        return res;
    }, [styles.styleErrorMsg, styleErrorMsg]);

    if (isEmpty(text)) {
        return null;
    }

    return (
        <View style={[styles.textContainer, {marginTop}]}>
            <Text style={[styles.textError, combinedStyleLine]}>{text}</Text>
        </View>
    );
};

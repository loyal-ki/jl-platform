import {StyleSheet} from 'react-native';

import {FontsEnum, makeStyleSheetFromTheme} from '@app/utils';

const percentByNumOfColumns = 100 / 3;

export const getKeyboardNumberPadStyles = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        pad: {
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            width: `${percentByNumOfColumns}%`,
        },
        buttonText: {
            color: theme.text,
            fontFamily: FontsEnum.quicksandSemiBold,
            fontSize: 32,
            textAlign: 'center',
        },
    })
);

import {StyleSheet} from 'react-native';

import {isIOS, makeStyleSheetFromTheme} from '@app/utils';
import {typography} from '@app/utils/styles/typography';

const percentByNumOfColumns = 1 / 4;
const sizeBox = 500 * percentByNumOfColumns - 12;

export const getCodeInputNumberStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: 'transparent',
            borderStyle: 'dashed',
            borderWidth: 2,
            borderRadius: 20,
            margin: 8,
            flex: 1,
            height: sizeBox,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'grey',
        },
        filled: {
            backgroundColor: theme.primary,
            borderStyle: isIOS ? 'dashed' : 'solid',
            borderColor: theme.primary,
        },
        unFilled: {
            backgroundColor: theme.white,
        },
        text: {
            ...typography.text32Bold,
            textAlign: 'center',
            color: theme.white,
        },
        textFilled: {
            color: theme.white,
        },
        textUnFilled: {
            color: 'grey',
        },
    })
);

export const getCodeInputContainerStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            overflow: 'hidden',
        },
    })
);

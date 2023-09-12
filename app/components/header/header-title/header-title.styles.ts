import {StyleSheet} from 'react-native';

import {makeStyleSheetFromTheme, typography} from '@app/utils';

export const getHeaderTitleStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        title: {
            ...typography.text16Bold,
            color: theme.text,
        },
        whiteColor: {
            color: theme.white,
        },
    })
);

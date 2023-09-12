import {StyleSheet} from 'react-native';

import {typography} from '@app/utils';
import {makeStyleSheetFromTheme} from '@app/utils/theme';

export const getLineStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        lineStyles: {
            borderBottomColor: theme.primary,
            borderBottomWidth: 1,
        },
    })
);

export const getHorizontalLineStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignSelf: 'center',
        },
        line: {
            borderBottomColor: theme.primary,
            borderBottomWidth: 1,
            flex: 1,
            alignSelf: 'center',
        },
        text: {
            ...typography.text12Bold,
            flexDirection: 'row',
            color: theme.primary,
            backgroundColor: theme.background,
            alignSelf: 'center',
            marginHorizontal: 12,
        },
    })
);

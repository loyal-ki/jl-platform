import {StyleSheet} from 'react-native';

import {Spacing24} from '@app/components';
import {formatSize, makeStyleSheetFromTheme, typography} from '@app/utils';

export const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        row: {
            flexDirection: 'row',
        },
        labelEmail: {
            ...typography.text18Regular,
            textAlign: 'center',
            color: theme.text,
        },
        receive: {
            ...typography.text16Regular,
            color: theme.text,
        },
        email: {
            ...typography.text20SemiBold,
            color: theme.primary,
        },
        timer: {
            ...typography.text32Bold,
            letterSpacing: 4,
            color: theme.primary,
        },
        resend: {
            ...typography.text16SemiBold,
            color: theme.primary,
        },
        textContainer: {
            marginHorizontal: formatSize(Spacing24),
            alignItems: 'center',
        },
    })
);

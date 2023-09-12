import {StyleSheet} from 'react-native';

import {formatSize, makeStyleSheetFromTheme, typography} from '@app/utils';

export const getButtonLargeStyleConfig = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        titleStyle: {
            ...typography.text18Bold,
        },
        containerStyle: {
            height: formatSize(58),
            borderRadius: formatSize(8),
        },
        iconStyle: {
            size: formatSize(16),
            marginRight: formatSize(2),
        },
        activeColorConfig: {
            titleColor: theme.text,
            backgroundColor: theme.primary,
        },
        disabledColorConfig: {
            titleColor: theme.text,
            backgroundColor: theme.grey,
        },
    })
);

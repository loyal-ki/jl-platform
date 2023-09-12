import {StyleSheet} from 'react-native';

import {formatSize, makeStyleSheetFromTheme, typography} from '@app/utils';

export const getButtonOutlineLargeStyleConfig = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        titleStyle: {
            ...typography.text18Bold,
        },
        containerStyle: {
            height: formatSize(60),
            borderRadius: formatSize(8),
            borderWidth: 2,
            borderStyle: 'dashed',
        },
        iconStyle: {
            size: formatSize(20),
            marginRight: formatSize(2),
        },
        activeColorConfig: {
            titleColor: theme.white,
            borderColor: theme.primary,
            backgroundColor: '',
        },
        disabledColorConfig: {
            titleColor: theme.text,
            backgroundColor: theme.grey,
        },
    })
);

import {StyleSheet} from 'react-native';

import {changeOpacity, makeStyleSheetFromTheme} from '@app/utils';

export const getButtonIconStyleConfig = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            height: 70,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            backgroundColor: changeOpacity(theme.primary, 0.08),
        },
    })
);

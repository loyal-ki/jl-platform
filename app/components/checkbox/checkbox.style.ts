import {StyleSheet} from 'react-native';

import {makeStyleSheetFromTheme} from '@app/utils';

export const checkboxStyles = makeStyleSheetFromTheme(theme =>
    StyleSheet.create({
        container: {
            width: 24,
            height: 24,
            marginTop: 5,
            marginHorizontal: 5,
            borderRadius: 4,
        },
    })
);

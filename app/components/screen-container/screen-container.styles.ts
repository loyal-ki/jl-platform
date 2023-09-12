import {StyleSheet} from 'react-native';

import {makeStyleSheetFromTheme} from '@app/utils/theme';

export const getScreenContainerStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
    })
);

import {StyleSheet} from 'react-native';

import {makeStyleSheetFromTheme} from '@app/utils/theme';

export const getVideoLearningStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        overlay: {
            top: 0,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 998,
        },
    })
);

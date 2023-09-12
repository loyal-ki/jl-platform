import {StyleSheet} from 'react-native';

import {Spacing16} from '@app/components';
import {makeStyleSheetFromTheme, typography} from '@app/utils';

export const getForgotPasswordStyleSheet = makeStyleSheetFromTheme((theme: Theme) => {
    return StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            paddingHorizontal: Spacing16,
        },
        buttonPadding: {
            flexDirection: 'column',
            paddingHorizontal: 16,
        },
        normalText: {
            ...typography.text14Regular,
            color: theme.text,
            letterSpacing: 2,
            textAlign: 'center',
        },
        borderRadiusTextField: {
            borderRadius: 8,
        },
        image: {
            alignSelf: 'center',
        },
    });
});

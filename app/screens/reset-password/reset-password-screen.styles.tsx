import {StyleSheet} from 'react-native';

import {Spacing16} from '@app/components';
import {makeStyleSheetFromTheme, typography} from '@app/utils';

export const getResetPasswordStyleSheet = makeStyleSheetFromTheme(theme => {
    return StyleSheet.create({
        image: {
            alignSelf: 'center',
        },
        container: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            paddingHorizontal: Spacing16,
        },
        labelNewPassword: {
            ...typography.text14Regular,
            flexDirection: 'row',
            color: theme.text,
            letterSpacing: 2,
        },
        buttonPadding: {
            flexDirection: 'column',
            paddingHorizontal: 16,
        },
        borderRadiusTextField: {
            borderRadius: 8,
        },
    });
});

import {StyleSheet} from 'react-native';

import {Spacing16, Spacing24} from '@app/components/alias';
import {makeStyleSheetFromTheme, typography} from '@app/utils';

export const getLoginStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        buttonPadding: {
            flexDirection: 'column',
            paddingHorizontal: 16,
        },
        container: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            paddingHorizontal: Spacing16,
        },
        title: {
            padding: Spacing24,
        },
        titleTextField: {
            flexDirection: 'row',
            fontSize: 14,
            paddingBottom: 8,
            color: theme.text,
        },
        textForgotButton: {
            ...typography.text14Bold,
            color: 'grey',
            textAlign: 'right',
        },
        textButton: {
            ...typography.text14Regular,
            color: theme.text,
            textAlign: 'center',
        },
        borderRadiusTextField: {
            borderRadius: 8,
        },
        rowText: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        textSignInButton: {
            ...typography.text14Bold,
            color: theme.primary,
        },
        touchableOpacity: {},
    })
);

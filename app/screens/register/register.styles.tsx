import {StyleSheet} from 'react-native';

import {Spacing16, Spacing24} from '@app/components';
import {makeStyleSheetFromTheme, typography} from '@app/utils';

export const getRegisterStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        buttonPadding: {
            flexDirection: 'column',
            paddingHorizontal: 16,
        },
        paddingTop: {
            paddingTop: 6,
        },
        container: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            paddingHorizontal: Spacing16,
            paddingVertical: Spacing24,
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
            color: theme.text,
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
            justifyContent: 'center',
        },
        textSignInButton: {
            ...typography.text14Regular,
            flexDirection: 'row',
            color: theme.primary,
        },
        textTermOfService: {
            ...typography.text14Regular,
            color: theme.text,
        },
        checkbox: {},

        screen: {
            flex: 1,
        },
    })
);

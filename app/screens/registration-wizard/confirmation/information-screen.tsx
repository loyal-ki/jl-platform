import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useTheme} from '@app/context';
import {makeStyleSheetFromTheme} from '@app/utils/theme';

import {ConfirmationScreenProps} from './confirmation-screen.props';

export const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
    })
);

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = () => {
    const {theme} = useTheme();

    const styles = getStyleSheet(theme);

    return (
        <View style={styles.container}>
            <Text>Confirmation Screen</Text>
        </View>
    );
};

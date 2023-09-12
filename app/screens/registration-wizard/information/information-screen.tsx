import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ButtonsContainer, ButtonLargePrimary, BlankSpacer, Spacing24} from '@app/components';
import {useTheme} from '@app/context';
import {makeStyleSheetFromTheme} from '@app/utils/theme';

import {InformationScreenProps} from './information-screen.props';

export const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
    })
);

export const InformationScreen: React.FC<InformationScreenProps> = ({onNextStepInfo}) => {
    const {theme} = useTheme();

    const styles = getStyleSheet(theme);

    return (
        <View style={styles.container}>
            <BlankSpacer height={Spacing24} />

            <Text>Information Screen</Text>
            <BlankSpacer height={Spacing24} />
            <ButtonsContainer>
                <ButtonLargePrimary
                    title="Navigation to Occupation"
                    onPress={() => {
                        onNextStepInfo?.();
                    }}
                    theme={theme}
                />
            </ButtonsContainer>
        </View>
    );
};

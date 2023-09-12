import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ButtonsContainer, ButtonLargePrimary} from '@app/components';
import {useTheme} from '@app/context';
import {makeStyleSheetFromTheme} from '@app/utils/theme';

import {OccupationScreenProps} from './occupation-screen.props';

export const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
    })
);

export const OccupationScreen: React.FC<OccupationScreenProps> = ({onNextStepInfo}) => {
    const {theme} = useTheme();

    const styles = getStyleSheet(theme);

    return (
        <View style={styles.container}>
            <Text>Occupation Screen</Text>

            <ButtonsContainer>
                <ButtonLargePrimary
                    title="Navigation to Level"
                    onPress={() => {
                        onNextStepInfo?.();
                    }}
                    theme={theme}
                />
            </ButtonsContainer>
        </View>
    );
};

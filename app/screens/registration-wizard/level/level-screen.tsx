import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ButtonsContainer, ButtonLargePrimary} from '@app/components';
import {useTheme} from '@app/context';
import {makeStyleSheetFromTheme} from '@app/utils/theme';

import {LevelScreenProps} from './level-screen.props';

export const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
    })
);

export const LevelScreen: React.FC<LevelScreenProps> = ({onNextStepInfo}) => {
    const {theme} = useTheme();

    const styles = getStyleSheet(theme);

    return (
        <View style={styles.container}>
            <Text>Level Screen</Text>
            <ButtonsContainer>
                <ButtonLargePrimary
                    title="Navigation to Confirmation"
                    onPress={() => {
                        onNextStepInfo?.();
                    }}
                    theme={theme}
                />
            </ButtonsContainer>
        </View>
    );
};

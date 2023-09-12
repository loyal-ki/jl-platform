import React from 'react';
import {StyleSheet, View} from 'react-native';

import {
    BlankSpacer,
    ButtonLargePrimary,
    ButtonsContainer,
    ScreenContainer,
    Spacing16,
} from '@app/components';
import {useTheme} from '@app/context';
import {makeStyleSheetFromTheme} from '@app/utils/theme';

import {ScreensEnum, push} from '@navigation';

export const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        screen: {
            flex: 1,
        },
        container: {
            paddingHorizontal: Spacing16,
        },
    })
);

export const WelcomeScreen: React.FC = () => {
    const {theme} = useTheme();

    const styles = getStyleSheet(theme);

    return (
        <ScreenContainer preset="fixed" style={styles.screen}>
            <View style={styles.container}>
                <ButtonsContainer>
                    <ButtonLargePrimary
                        title="Navigation to Login"
                        onPress={() => {
                            push(ScreensEnum.Login);
                        }}
                        theme={theme}
                    />
                </ButtonsContainer>
            </View>
            <BlankSpacer height={Spacing16} />
            <View style={styles.container}>
                <ButtonsContainer>
                    <ButtonLargePrimary
                        title="Navigation to Registration wizard"
                        onPress={() => {
                            push(ScreensEnum.RegistrationWizard);
                        }}
                        theme={theme}
                    />
                </ButtonsContainer>
            </View>
            <BlankSpacer height={Spacing16} />
            <View style={styles.container}>
                <ButtonsContainer>
                    <ButtonLargePrimary
                        title="Navigation to Video"
                        onPress={() => {
                            push(ScreensEnum.VideoLearningDetails);
                        }}
                        theme={theme}
                    />
                </ButtonsContainer>
            </View>
        </ScreenContainer>
    );
};

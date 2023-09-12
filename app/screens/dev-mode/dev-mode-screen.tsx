import React from 'react';
import {StyleSheet, View} from 'react-native';

import {ScreenContainer} from '@app/components';
import {BlankSpacer, Spacing16} from '@app/components/alias';
import {ButtonLargePrimary} from '@app/components/button/button-large';
import {ButtonsContainer} from '@app/components/button/buttons-container';
import {useTheme} from '@app/context';
import {ScreensEnum, push} from '@app/navigation';
import {makeStyleSheetFromTheme} from '@app/utils/theme';

export const getDevModeStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        screen: {
            flex: 1,
        },
        container: {
            flex: 1,
            flexDirection: 'column',
            paddingHorizontal: Spacing16,
            backgroundColor: theme.background,
        },
    })
);

export const DevModeScreen: React.FC = () => {
    const {theme} = useTheme();
    const styles = getDevModeStyleSheet(theme);

    return (
        <ScreenContainer preset="fixed" style={styles.screen}>
            <View style={styles.container}>
                <ButtonsContainer>
                    <ButtonLargePrimary
                        title="navigation to welcome screen"
                        onPress={async () => {
                            push(ScreensEnum.Welcome);
                        }}
                        theme={theme}
                    />
                </ButtonsContainer>

                <BlankSpacer height={Spacing16} />

                <ButtonsContainer>
                    <ButtonLargePrimary
                        title="navigation to features mini-app"
                        onPress={async () => {
                            push(ScreensEnum.DevFeatures);
                        }}
                        theme={theme}
                    />
                </ButtonsContainer>
            </View>
        </ScreenContainer>
    );
};

import React, {useMemo} from 'react';
import {Image, Text, View} from 'react-native';

import {
    BlankSpacer,
    ButtonLargePrimary,
    ButtonsContainer,
    Input,
    InputErrorMessage,
    LocalImagePath,
    ScreenContainer,
    Spacing20,
    Spacing32,
    Spacing4,
    Spacing90,
} from '@app/components';
import {AppLocalizationKeys} from '@app/localization/localization.keys';
import {AppCommonStyles} from '@app/utils';

import {getResetPasswordStyleSheet} from './reset-password-screen.styles';
import {useResetPasswordViewModel} from './reset-password-screen.view-model';

export const ResetPasswordScreen: React.FC = () => {
    const {
        theme,
        isFormValid,
        passwordRef,
        confirmPasswordRef,
        state,
        formatMessage,
        onPasswordChange,
        onConfirmPasswordChange,
    } = useResetPasswordViewModel();
    const styles = getResetPasswordStyleSheet(theme);
    const StickyButton = useMemo(() => {
        return (
            <ButtonsContainer style={styles.buttonPadding}>
                <ButtonLargePrimary
                    title={formatMessage({
                        id: AppLocalizationKeys.reset_password.confirm_password_button_label,
                    })}
                    onPress={() => {}}
                    disabled={!isFormValid}
                    theme={theme}
                />
            </ButtonsContainer>
        );
    }, [formatMessage, isFormValid, styles.buttonPadding, theme]);

    return (
        <ScreenContainer
            unsafe
            preset="scroll"
            style={AppCommonStyles.root}
            StickyFooter={StickyButton}>
            <View style={styles.container}>
                <Image style={styles.image} source={LocalImagePath.resetPasswordImage} />
                <BlankSpacer height={Spacing32} />
                <Text style={styles.labelNewPassword}>
                    {formatMessage({
                        id: AppLocalizationKeys.reset_password.please_write_new_password_label,
                    })}
                </Text>
                <BlankSpacer height={Spacing32} />
                <Input
                    ref={passwordRef}
                    theme={theme}
                    autoCorrect={false}
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    disableFullscreenUI
                    textContentType="oneTimeCode"
                    placeholder={formatMessage({
                        id: AppLocalizationKeys.reset_password.enter_new_password_label,
                    })}
                    enablesReturnKeyAutomatically
                    onChangeText={onPasswordChange}
                    onSubmitEditing={() => {}}
                    label={formatMessage({id: AppLocalizationKeys.reset_password.page_title})}
                    returnKeyType="next"
                    showErrorIcon
                    isPassword
                    spellCheck={false}
                    textInputStyle={styles.borderRadiusTextField}
                />
                <BlankSpacer height={Spacing4} />

                <InputErrorMessage
                    text={
                        state.newPasswordError ? formatMessage({id: state.newPasswordError}) : ' '
                    }
                    theme={theme}
                />

                <BlankSpacer height={Spacing20} />
                <Input
                    ref={confirmPasswordRef}
                    theme={theme}
                    autoCorrect={false}
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    disableFullscreenUI
                    textContentType="oneTimeCode"
                    label={formatMessage({
                        id: AppLocalizationKeys.reset_password.confirm_password_label,
                    })}
                    enablesReturnKeyAutomatically
                    onChangeText={onConfirmPasswordChange}
                    onSubmitEditing={() => {}}
                    placeholder={formatMessage({
                        id: AppLocalizationKeys.reset_password.enter_confirm_password_label,
                    })}
                    returnKeyType="next"
                    showErrorIcon
                    isPassword
                    spellCheck={false}
                    textInputStyle={styles.borderRadiusTextField}
                />
                <BlankSpacer height={Spacing4} />
                <InputErrorMessage
                    text={
                        state.confirmNewPasswordError
                            ? formatMessage({id: state.confirmNewPasswordError})
                            : ' '
                    }
                    theme={theme}
                />
                <BlankSpacer height={Spacing90} />
            </View>
        </ScreenContainer>
    );
};

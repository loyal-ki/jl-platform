import React, {useMemo} from 'react';
import {Image, Text} from 'react-native';

import {
    BlankSpacer,
    ButtonLargePrimary,
    ButtonsContainer,
    IconNameEnum,
    Input,
    InputErrorMessage,
    LocalImagePath,
    ScreenContainer,
    Spacing32,
} from '@app/components';
import {AppLocalizationKeys} from '@app/localization/localization.keys';

import {getForgotPasswordStyleSheet} from './forgot-password.styles';
import {useForgotPasswordViewModel} from './forgot-password.view-model';

export const ForgotPasswordScreen: React.FC = () => {
    const {theme, state, isFormValid, emailRef, onEmailChange, formatMessage, onConfirmEmail} =
        useForgotPasswordViewModel();
    const styles = getForgotPasswordStyleSheet(theme);
    const StickyButton = useMemo(() => {
        return (
            <ButtonsContainer style={styles.buttonPadding}>
                <ButtonLargePrimary
                    title={formatMessage({
                        id: AppLocalizationKeys.forgot_password.confirm_mail_label,
                    })}
                    onPress={onConfirmEmail}
                    disabled={!isFormValid}
                    theme={theme}
                />
            </ButtonsContainer>
        );
    }, [formatMessage, onConfirmEmail, isFormValid, styles.buttonPadding, theme]);
    return (
        <ScreenContainer style={styles.container} StickyFooter={StickyButton}>
            <Image style={styles.image} source={LocalImagePath.forgotPasswordImage} />
            <BlankSpacer height={Spacing32} />
            <Text style={styles.normalText}>
                {formatMessage({id: AppLocalizationKeys.forgot_password.write_your_email})}
            </Text>
            <BlankSpacer height={Spacing32} />
            <Input
                ref={emailRef}
                theme={theme}
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                disableFullscreenUI
                iconRightName={IconNameEnum.VerifiedEmailIcon}
                placeholder={formatMessage({
                    id: AppLocalizationKeys.forgot_password.email_placeholder,
                })}
                onChangeText={onEmailChange}
                onSubmitEditing={() => {}}
                keyboardType="email-address"
                label={formatMessage({id: AppLocalizationKeys.forgot_password.email})}
                returnKeyType="next"
                showErrorIcon
                spellCheck={false}
                textInputStyle={styles.borderRadiusTextField}
            />
            <InputErrorMessage
                text={state.emailError ? formatMessage({id: state.emailError}) : ' '}
                theme={theme}
            />
        </ScreenContainer>
    );
};

import React, {useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {
    BlankSpacer,
    ButtonLargePrimary,
    ButtonsContainer,
    Input,
    InputErrorMessage,
    LineWithText,
    ScreenContainer,
    Spacing12,
    Spacing16,
    Spacing32,
    Spacing4,
    Spacing8,
    Spacing90,
    ButtonIcon,
    CheckBox,
    IconNameEnum,
} from '@app/components';
import {AppLocalizationKeys} from '@app/localization/localization.keys';
import {AppCommonStyles} from '@app/utils';

import {getRegisterStyleSheet} from './register.styles';
import {useRegisterViewModel} from './register.view-model';

export const RegisterScreen: React.FC = () => {
    const {
        emailRef,
        passwordRef,
        confirmPasswordRef,
        state,
        theme,
        isFormValid,
        formatMessage,
        onEmailChange,
        onPasswordChange,
        onConfirmPasswordChange,
        onChangeValuePolicy,
        onRegister,
        onGoBackToLogin,
    } = useRegisterViewModel();

    const styles = getRegisterStyleSheet(theme);
    const StickyFooter = useMemo(() => {
        return (
            <View style={styles.buttonPadding}>
                <ButtonsContainer>
                    <ButtonLargePrimary
                        title={formatMessage({id: AppLocalizationKeys.login.button_sign_up})}
                        onPress={onRegister}
                        disabled={!isFormValid}
                        theme={theme}
                    />
                </ButtonsContainer>
                <BlankSpacer height={Spacing12} />
                <View style={AppCommonStyles.centerText}>
                    <Text style={styles.textButton}>
                        {formatMessage({id: AppLocalizationKeys.login.button_do_not_have_account})}{' '}
                    </Text>
                    <TouchableOpacity onPress={onGoBackToLogin}>
                        <Text style={styles.textSignInButton}>
                            {formatMessage({id: AppLocalizationKeys.login.page_title})}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }, [
        formatMessage,
        isFormValid,
        onGoBackToLogin,
        onRegister,
        styles.buttonPadding,
        styles.textButton,
        styles.textSignInButton,
        theme,
    ]);

    return (
        <ScreenContainer
            unsafe
            StickyFooter={StickyFooter}
            preset="scroll"
            style={AppCommonStyles.root}>
            <BlankSpacer height={Spacing32} />
            <View style={styles.container}>
                <Input
                    ref={emailRef}
                    theme={theme}
                    autoCorrect={false}
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    iconRightName={IconNameEnum.VerifiedEmailIcon}
                    disableFullscreenUI
                    placeholder={formatMessage({
                        id: AppLocalizationKeys.login.email_or_phone_placeholder,
                    })}
                    enablesReturnKeyAutomatically
                    onChangeText={onEmailChange}
                    onSubmitEditing={() => {}}
                    keyboardType="email-address"
                    label={formatMessage({id: AppLocalizationKeys.login.email_or_phone_title})}
                    returnKeyType="next"
                    showErrorIcon
                    spellCheck={false}
                    textInputStyle={styles.borderRadiusTextField}
                />
                <BlankSpacer height={Spacing4} />
                <InputErrorMessage
                    text={state.emailError ? formatMessage({id: state.emailError}) : ' '}
                    theme={theme}
                />
                <BlankSpacer height={Spacing16} />
                <Input
                    ref={passwordRef}
                    theme={theme}
                    autoCorrect={false}
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    disableFullscreenUI
                    textContentType="oneTimeCode"
                    placeholder={formatMessage({
                        id: AppLocalizationKeys.login.password_placeholder,
                    })}
                    enablesReturnKeyAutomatically
                    onChangeText={onPasswordChange}
                    onSubmitEditing={() => {}}
                    label={formatMessage({id: AppLocalizationKeys.login.password_title})}
                    returnKeyType="next"
                    showErrorIcon
                    isPassword
                    spellCheck={false}
                    textInputStyle={styles.borderRadiusTextField}
                />
                <BlankSpacer height={Spacing4} />

                <InputErrorMessage
                    text={state.passwordError ? formatMessage({id: state.passwordError}) : ' '}
                    theme={theme}
                />

                <BlankSpacer height={Spacing32} />
                <Input
                    ref={confirmPasswordRef}
                    theme={theme}
                    autoCorrect={false}
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    disableFullscreenUI
                    textContentType="oneTimeCode"
                    label={formatMessage({id: AppLocalizationKeys.register.confirm_password})}
                    enablesReturnKeyAutomatically
                    onChangeText={onConfirmPasswordChange}
                    onSubmitEditing={() => {}}
                    placeholder={formatMessage({
                        id: AppLocalizationKeys.register.confirm_password_placeholder,
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
                        state.confirmpasswordError
                            ? formatMessage({id: state.confirmpasswordError})
                            : ' '
                    }
                    theme={theme}
                />
                <BlankSpacer height={Spacing90} />
                <LineWithText
                    theme={theme}
                    text={formatMessage({id: AppLocalizationKeys.register.or_continue_with})}
                />
                <BlankSpacer height={Spacing32} />

                <ButtonsContainer style={{flexDirection: 'row'}}>
                    <ButtonIcon
                        theme={theme}
                        iconName={IconNameEnum.GoogleIcon}
                        onPress={() => {}}
                    />
                    <BlankSpacer width={Spacing8} />
                    <ButtonIcon
                        theme={theme}
                        iconName={IconNameEnum.FacebookIcon}
                        onPress={() => {}}
                    />
                </ButtonsContainer>
                <BlankSpacer height={Spacing32} />
                <View style={{flexDirection: 'row'}}>
                    <CheckBox
                        theme={theme}
                        onPress={onChangeValuePolicy}
                        isChecked={state.agreeWithPolicy}
                    />
                    <BlankSpacer width={Spacing8} />
                    <Text style={styles.textTermOfService}>
                        {formatMessage({id: AppLocalizationKeys.register.title_term_of_service})}{' '}
                        <Text style={styles.textSignInButton} onPress={() => {}}>
                            {formatMessage({id: AppLocalizationKeys.register.title_privacy_policy})}
                        </Text>
                    </Text>
                </View>
            </View>
        </ScreenContainer>
    );
};

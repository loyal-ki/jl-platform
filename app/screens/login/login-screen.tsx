import React, {useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {
    BlankSpacer,
    ButtonIcon,
    ButtonLargePrimary,
    ButtonsContainer,
    IconNameEnum,
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
} from '@app/components';
import {AppLocalizationKeys} from '@app/localization/localization.keys';
import {AppCommonStyles} from '@app/utils';

import {getLoginStyleSheet} from './login-screen.styles';
import {useViewModel} from './login-screen.view-model';

export const LoginScreen: React.FC = () => {
    const {
        emailRef,
        passwordRef,
        state,
        theme,
        isFormValid,
        formatMessage,
        onEmailChange,
        onPasswordChange,
        onLogin,
        onNavigationToRegister,
        onNavigateToForgotPassword,
    } = useViewModel();
    const styles = getLoginStyleSheet(theme);

    const StickyFooter = useMemo(() => {
        return (
            <View style={styles.buttonPadding}>
                <ButtonsContainer>
                    <ButtonLargePrimary
                        title={formatMessage({id: AppLocalizationKeys.login.button_title})}
                        onPress={onLogin}
                        disabled={!isFormValid}
                        theme={theme}
                    />
                </ButtonsContainer>

                <BlankSpacer height={Spacing12} />
                <View style={AppCommonStyles.centerText}>
                    <Text style={styles.textButton}>
                        {formatMessage({id: AppLocalizationKeys.login.button_do_not_have_account})}{' '}
                    </Text>
                    <TouchableOpacity
                        onPress={onNavigationToRegister}
                        style={styles.touchableOpacity}>
                        <Text style={styles.textSignInButton}>
                            {formatMessage({id: AppLocalizationKeys.login.button_sign_up})}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }, [
        formatMessage,
        isFormValid,
        onLogin,
        onNavigationToRegister,
        styles.buttonPadding,
        styles.textButton,
        styles.textSignInButton,
        styles.touchableOpacity,
        theme,
    ]);

    return (
        <ScreenContainer
            unsafe
            StickyFooter={StickyFooter}
            preset="fixed"
            style={AppCommonStyles.root}>
            <View style={[styles.container]}>
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
                        id: AppLocalizationKeys.login.email_or_phone_placeholder,
                    })}
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
                    secureTextEntry
                    blurOnSubmit={false}
                    disableFullscreenUI
                    isPassword
                    placeholder={formatMessage({
                        id: AppLocalizationKeys.login.password_placeholder,
                    })}
                    onChangeText={onPasswordChange}
                    onSubmitEditing={() => {}}
                    label={formatMessage({id: AppLocalizationKeys.login.password_title})}
                    returnKeyType="next"
                    showErrorIcon
                    spellCheck={false}
                    textInputStyle={styles.borderRadiusTextField}
                />
                <BlankSpacer height={Spacing4} />

                <InputErrorMessage
                    text={state.passwordError ? formatMessage({id: state.passwordError}) : ' '}
                    theme={theme}
                />

                <BlankSpacer height={Spacing32} />
                <TouchableOpacity onPress={onNavigateToForgotPassword}>
                    <Text style={styles.textForgotButton}>
                        {formatMessage({id: AppLocalizationKeys.login.button_forgot_password})}
                    </Text>
                </TouchableOpacity>
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
            </View>
        </ScreenContainer>
    );
};

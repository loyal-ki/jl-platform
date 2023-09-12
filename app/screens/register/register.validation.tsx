import {t} from '@app/localization';
import {AppLocalizationKeys} from '@app/localization/localization.keys';
import {ValidationResult, isNilOrEmpty, isValidEmail, isValidPassword} from '@app/utils';

import {IRegisterState, RegisterValidateResults} from './register.types';

export const validateEmail = (email: string): ValidationResult<string> => {
    if (isNilOrEmpty(email)) {
        return ValidationResult.error(
            t(AppLocalizationKeys.login.email_or_phone_empty_error_message)
        );
    }

    if (!isValidEmail(email)) {
        return ValidationResult.error(
            t(AppLocalizationKeys.login.email_wrong_format_error_message)
        );
    }

    return ValidationResult.ok();
};

export const validatePassword = (password: string): ValidationResult<string> => {
    if (isNilOrEmpty(password)) {
        return ValidationResult.error(t(AppLocalizationKeys.login.password_empty_error_message));
    }

    if (!isValidPassword(password)) {
        return ValidationResult.error(
            t(AppLocalizationKeys.login.password_wrong_format_error_message)
        );
    }
    return ValidationResult.ok();
};

export const validateConfirmPassword = (
    password: string,
    confirmPassword: string
): ValidationResult<string> => {
    if (isNilOrEmpty(confirmPassword)) {
        return ValidationResult.error(t(AppLocalizationKeys.login.password_empty_error_message));
    }

    if (confirmPassword !== password) {
        return ValidationResult.error(t(AppLocalizationKeys.register.wrong_confirm_password));
    }

    return ValidationResult.ok();
};

export const validateForm = (state: IRegisterState): RegisterValidateResults => {
    const emailValid = validateEmail(state.email);

    const passwordValid = validatePassword(state.password);

    const confirmPasswordValid = validateConfirmPassword(state.password, state.confirmpassword);

    const {agreeWithPolicy} = state;

    const isFormValid =
        emailValid.isValid &&
        passwordValid.isValid &&
        confirmPasswordValid.isValid &&
        state.agreeWithPolicy;

    return {
        isFormValid,
        emailValid,
        passwordValid,
        confirmPasswordValid,
        agreeWithPolicy,
    };
};

import {t} from '@app/localization';
import {AppLocalizationKeys} from '@app/localization/localization.keys';
import {ValidationResult, isNilOrEmpty, isValidPassword} from '@app/utils';

import {IResetPasswordState, ResetPasswordValidateResults} from './reset-password-screen.types';

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

export const validateForm = (state: IResetPasswordState): ResetPasswordValidateResults => {
    const passwordValid = validatePassword(state.newPassword);

    const confirmPasswordValid = validateConfirmPassword(
        state.newPassword,
        state.confirmNewPassword
    );

    const isFormValid = passwordValid.isValid && confirmPasswordValid.isValid;
    return {
        isFormValid,
        passwordValid,
        confirmPasswordValid,
    };
};

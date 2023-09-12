import {t} from '@app/localization';
import {AppLocalizationKeys} from '@app/localization/localization.keys';
import {ValidationResult, isNilOrEmpty, isValidEmail} from '@app/utils';

import {ForgotPasswordValidationResults, IForgotPasswordState} from './forgot-password.types';

export const validateEmail = (email: string): ValidationResult<string> => {
    if (isNilOrEmpty(email)) {
        return ValidationResult.error(t(AppLocalizationKeys.forgot_password.email_empty_error));
    }

    if (!isValidEmail(email)) {
        return ValidationResult.error(
            t(AppLocalizationKeys.login.email_wrong_format_error_message)
        );
    }

    return ValidationResult.ok();
};
export const validateForm = (state: IForgotPasswordState): ForgotPasswordValidationResults => {
    const emailValid = validateEmail(state.email);

    const isFormValid = emailValid.isValid;

    return {
        isFormValid,
        emailValid,
    };
};

import {ValidationResult} from '@app/utils';

export const SET_EMAIL = 'ForgotPassword/SetEmail';
export const VALIDATE_FORM = 'ForgotPassword/ValidateForm';

export const ForgotPasswordAction = {
    setEmailAction: SET_EMAIL,
    validateFormAction: VALIDATE_FORM,
};
export interface IForgotPasswordState {
    email: string;
    emailError: string | undefined;
}

export type ForgotPasswordValidationResults = {
    isFormValid: boolean;
    emailValid: ValidationResult<unknown>;
};

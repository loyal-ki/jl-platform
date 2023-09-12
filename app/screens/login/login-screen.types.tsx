import {ValidationResult} from '@app/utils';

export const SET_EMAIL = 'LoginActionsConstance/SetEmail';
export const SET_PASSWORD = 'LoginActionsConstance/SetPassword';
export const VALIDATE_FORM = 'LoginActionsConstance/ValidateForm';

export const LoginActionsConstance = {
    setEmailAction: SET_EMAIL,
    setPasswordAction: SET_PASSWORD,
    validateForm: VALIDATE_FORM,
};

export interface ILoginState {
    email: string;
    emailError: string | undefined;
    password: string;
    passwordError: string | undefined;
}

export type LoginValidationResults = {
    isFormValid: boolean;
    emailValid: ValidationResult<unknown>;
    passwordValid: ValidationResult<unknown>;
};

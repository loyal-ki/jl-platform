import {ValidationResult} from '@app/utils';

export const NEW_PASSWORD = 'ResetPassword/NewPassword';
export const CONFIRM_NEW_PASSWORD = 'ResetPassword/ConfirmNewPassword';
export const VALIDATE_FORM = 'ResetPassword/ValidateForm';

export interface IResetPasswordState {
    newPassword: string;
    newPasswordError: string | undefined;
    confirmNewPassword: string;
    confirmNewPasswordError: string | undefined;
}

export const ResetPasswordAction = {
    setPasswordAction: NEW_PASSWORD,
    setConfirmNewPasswordAction: CONFIRM_NEW_PASSWORD,
    validateFormAction: VALIDATE_FORM,
};

export type ResetPasswordValidateResults = {
    isFormValid: boolean;
    passwordValid: ValidationResult<unknown>;
    confirmPasswordValid: ValidationResult<unknown>;
};

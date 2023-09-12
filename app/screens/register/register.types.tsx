import {ValidationResult} from '@utils/validate';

export const SET_EMAIL = 'RegisterAction/SetEmail';
export const SET_PASSWORD = 'RegisterAction/SetPassword';
export const SET_CONFIRM_PASSWORD = 'RegisterAction/SetConfirmPassword';
export const VALIDATE_FORM = 'RegisterAction/ValidateForm';
export const SET_IS_AGREE_WITH_POLICY = 'RegisterAction/AgreeWithPolicy';
export const SET_SHOW_PASSWORD = 'RegisterAction/ShowPassword';
export const SET_SHOW_CONFIRM_PASSWORD = 'RegisterAction/ShowConfirmPassword';

export const RegisterAction = {
    setEmailAction: SET_EMAIL,
    setPasswordAction: SET_PASSWORD,
    setShowPasswordAction: SET_SHOW_PASSWORD,
    setConfirmPasswordAction: SET_CONFIRM_PASSWORD,
    setShowConfirmPasswordAction: SET_SHOW_CONFIRM_PASSWORD,
    setIsAgreeWithPolicyAction: SET_IS_AGREE_WITH_POLICY,
    validateFormAction: VALIDATE_FORM,
};

export interface IRegisterState {
    email: string;
    emailError: string | undefined;
    password: string;
    isShowPassword: boolean;
    passwordError: string | undefined;
    confirmpassword: string;
    isShowConfirmPassword: boolean;
    confirmpasswordError: string | undefined;
    agreeWithPolicy: boolean;
}

export type RegisterValidateResults = {
    isFormValid: boolean;
    emailValid: ValidationResult<unknown>;
    passwordValid: ValidationResult<unknown>;
    confirmPasswordValid: ValidationResult<unknown>;
    agreeWithPolicy: boolean;
};

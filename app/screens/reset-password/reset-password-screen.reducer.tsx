import {createReducer} from 'typesafe-actions';

import {resetPasswordActions, ResetPasswordActionType} from './reset-password-screen.action';
import {IResetPasswordState} from './reset-password-screen.types';
import {validateConfirmPassword, validatePassword} from './reset-password-screen.validation';

export const initialState: IResetPasswordState = {
    newPassword: '',
    newPasswordError: undefined,
    confirmNewPassword: '',
    confirmNewPasswordError: undefined,
};
export const resetPasswordReducer = createReducer<IResetPasswordState, ResetPasswordActionType>(
    initialState
)
    .handleAction(resetPasswordActions.setPasswordAction, (state, action) => {
        return {
            ...state,
            newPassword: action.payload.password,
            newPasswordError: validatePassword(action.payload.password).errorMessage,
        };
    })
    .handleAction(resetPasswordActions.setConfirmPasswordAction, (state, action) => {
        return {
            ...state,
            confirmNewPassword: action.payload.confirmPassword,
            confirmNewPasswordError: validateConfirmPassword(
                state.newPassword,
                action.payload.confirmPassword
            ).errorMessage,
        };
    })
    .handleAction(resetPasswordActions.validateFormAction, (state, action) => {
        const passwordError = validatePassword(state.newPassword).errorMessage;
        const confirmPasswordError = validateConfirmPassword(
            state.newPassword,
            state.confirmNewPassword
        ).errorMessage;
        return {
            ...state,
            passwordError,
            confirmPasswordError,
        };
    });

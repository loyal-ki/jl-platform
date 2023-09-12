import {ActionType, createAction} from 'typesafe-actions';

import {ResetPasswordAction} from './reset-password-screen.types';

export const setPasswordAction = createAction(ResetPasswordAction.setPasswordAction, password => ({
    password,
}))();

export const setConfirmPasswordAction = createAction(
    ResetPasswordAction.setConfirmNewPasswordAction,
    confirmPassword => ({confirmPassword})
)();

export const validateFormAction = createAction(ResetPasswordAction.validateFormAction, () => {})();

export const resetPasswordActions = {
    setPasswordAction,
    setConfirmPasswordAction,
    validateFormAction,
};

export type ResetPasswordActionType = ActionType<typeof resetPasswordActions>;

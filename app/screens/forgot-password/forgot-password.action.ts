import {ActionType, createAction} from 'typesafe-actions';

import {ForgotPasswordAction} from './forgot-password.types';

export const setEmailAction = createAction(
    ForgotPasswordAction.setEmailAction,
    (email: string) => ({email})
)();

export const validateFormAction = createAction(
    ForgotPasswordAction.validateFormAction,
    () => ({})
)();

export const forgotPasswordAction = {
    setEmailAction,
    validateFormAction,
};

export type ForgotPasswordActionType = ActionType<typeof forgotPasswordAction>;

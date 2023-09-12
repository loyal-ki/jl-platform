import {ActionType, createAction} from 'typesafe-actions';

import {LoginActionsConstance} from './login-screen.types';

const setEmailAction = createAction(LoginActionsConstance.setEmailAction, (email: string) => ({
    email,
}))();

const setPasswordAction = createAction(
    LoginActionsConstance.setPasswordAction,
    (password: string) => ({
        password,
    })
)();

const validateFormAction = createAction(LoginActionsConstance.validateForm, () => ({}))();

export const loginActions = {
    setEmailAction,
    setPasswordAction,
    validateFormAction,
};

export type LoginActionType = ActionType<typeof loginActions>;

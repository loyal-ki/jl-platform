import {ActionType, createAction} from 'typesafe-actions';

import {RegisterAction} from './register.types';

const setEmailAction = createAction(RegisterAction.setEmailAction, email => ({
    email,
}))();

const setPasswordAction = createAction(RegisterAction.setPasswordAction, password => ({
    password,
}))();
const setShowPasswordAction = createAction(RegisterAction.setShowPasswordAction, showPassword => ({
    showPassword,
}))();

const setConfirmPasswordAction = createAction(
    RegisterAction.setConfirmPasswordAction,
    confirmPassword => ({confirmPassword})
)();
const setShowConfirmPasswordAction = createAction(
    RegisterAction.setShowConfirmPasswordAction,
    showConfirmPassword => ({showConfirmPassword})
)();

const setIsAgreeWithPolicyAction = createAction(
    RegisterAction.setIsAgreeWithPolicyAction,
    agreePolicy => ({agreePolicy})
)();

const validateFormAction = createAction(RegisterAction.validateFormAction, () => {})();

export const registerActions = {
    setEmailAction,
    setPasswordAction,
    setShowPasswordAction,
    setConfirmPasswordAction,
    setShowConfirmPasswordAction,
    setIsAgreeWithPolicyAction,
    validateFormAction,
};

export type RegisterActionType = ActionType<typeof registerActions>;

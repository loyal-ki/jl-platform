import {createReducer} from 'typesafe-actions';

import {RegisterActionType, registerActions} from './register.actions';
import {IRegisterState} from './register.types';
import {validateEmail, validatePassword, validateConfirmPassword} from './register.validation';

export const initialState: IRegisterState = {
    email: '',
    emailError: undefined,
    password: '',
    isShowPassword: false,
    passwordError: undefined,
    confirmpassword: '',
    isShowConfirmPassword: false,
    confirmpasswordError: undefined,
    agreeWithPolicy: false,
};

export const reducer = createReducer<IRegisterState, RegisterActionType>(initialState)
    .handleAction(registerActions.setEmailAction, (state, action) => {
        return {
            ...state,
            email: action.payload.email,
            emailError: validateEmail(action.payload.email).errorMessage,
        };
    })
    .handleAction(registerActions.setPasswordAction, (state, action) => {
        return {
            ...state,
            password: action.payload.password,
            passwordError: validatePassword(action.payload.password).errorMessage,
        };
    })
    .handleAction(registerActions.setShowPasswordAction, (state, action) => {
        return {
            ...state,
            isShowPassword: action.payload.showPassword,
        };
    })
    .handleAction(registerActions.setConfirmPasswordAction, (state, action) => {
        return {
            ...state,
            confirmpassword: action.payload.confirmPassword,
            confirmpasswordError: validateConfirmPassword(
                state.password,
                action.payload.confirmPassword
            ).errorMessage,
        };
    })
    .handleAction(registerActions.setShowConfirmPasswordAction, (state, action) => {
        return {
            ...state,
            isShowConfirmPassword: action.payload.showConfirmPassword,
        };
    })
    .handleAction(registerActions.setIsAgreeWithPolicyAction, (state, action) => {
        return {
            ...state,
            agreeWithPolicy: action.payload.agreePolicy,
        };
    })
    .handleAction(registerActions.validateFormAction, (state, action) => {
        const emailError = validateEmail(state.email).errorMessage;
        const passwordError = validatePassword(state.password).errorMessage;
        const confirmPasswordError = validateConfirmPassword(
            state.password,
            state.confirmpassword
        ).errorMessage;
        return {
            ...state,
            emailError,
            passwordError,
            confirmPasswordError,
        };
    });

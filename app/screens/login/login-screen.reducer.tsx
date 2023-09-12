import {createReducer} from 'typesafe-actions';

import {LoginActionType, loginActions} from './login-screen.actions';
import {ILoginState} from './login-screen.types';
import {validateEmail, validatePassword} from './login-screen.validation';

export const initialState: ILoginState = {
    email: '',
    emailError: undefined,
    password: '',
    passwordError: undefined,
};

export const reducer = createReducer<ILoginState, LoginActionType>(initialState)
    .handleAction(loginActions.setEmailAction, (state, action) => {
        return {
            ...state,
            email: action.payload.email,
            emailError: validateEmail(action.payload.email).errorMessage,
        };
    })
    .handleAction(loginActions.setPasswordAction, (state, action) => {
        return {
            ...state,
            password: action.payload.password,
            passwordError: validatePassword(action.payload.password).errorMessage,
        };
    })
    .handleAction(loginActions.validateFormAction, (state, action) => {
        const emailError = validateEmail(state.email).errorMessage;
        const passwordError = validatePassword(state.password).errorMessage;

        return {
            ...state,
            emailError,
            passwordError,
        };
    });

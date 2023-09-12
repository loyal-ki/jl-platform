import {createReducer} from 'typesafe-actions';

import {validateEmail} from './forgot-password-validation';
import {ForgotPasswordActionType, forgotPasswordAction} from './forgot-password.action';
import {IForgotPasswordState} from './forgot-password.types';

export const initialState: IForgotPasswordState = {
    email: '',
    emailError: undefined,
};
export const forgotPasswordReducer = createReducer<IForgotPasswordState, ForgotPasswordActionType>(
    initialState
)
    .handleAction(forgotPasswordAction.setEmailAction, (state, action) => {
        return {
            ...state,
            email: action.payload.email,
            emailError: validateEmail(action.payload.email).errorMessage,
        };
    })
    .handleAction(forgotPasswordAction.validateFormAction, (state, action) => {
        const emailError = validateEmail(state.email).errorMessage;
        return {
            ...state,
            emailError,
        };
    });

import {createReducer} from 'typesafe-actions';

import {OtpActionType, otpActions} from './otp-screen.action';
import {IOtpState} from './otp-screen.types';

export const initialState: IOtpState = {
    id: '',
    email: 'abc@gmail.com',
    otp: '',
};
export const reducer = createReducer<IOtpState, OtpActionType>(initialState)
    .handleAction(otpActions.startTimerAction, (state, action) => {
        return {
            ...state,
        };
    })
    .handleAction(otpActions.insertOtpAction, (state, action) => {
        return {
            ...state,
            otp: action.payload.otp,
        };
    })
    .handleAction(otpActions.deleteOtpAction, (state, action) => {
        return {
            ...state,
            otp: action.payload.value,
        };
    });

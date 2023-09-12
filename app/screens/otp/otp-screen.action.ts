import {ActionType, createAction} from 'typesafe-actions';

import {OtpAction} from './otp-screen.types';

export const startTimerAction = createAction(OtpAction.startTimer, () => {})();

export const insertOtpAction = createAction(OtpAction.insertOtp, otp => ({otp}))();

export const deleteOtpAction = createAction(OtpAction.deleteOtp, value => ({value}))();

export const otpActions = {
    startTimerAction,
    insertOtpAction,
    deleteOtpAction,
};
export type OtpActionType = ActionType<typeof otpActions>;

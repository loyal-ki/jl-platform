export const START_TIMER = 'OtpAction/StartTimer';
export const INSERT_OTP = 'OtpAction/InsertOTP';
export const DELETE_OTP = 'OtpAction/DeleteOTP';

export interface IOtpState {
    id: string;
    email: string;
    otp: string;
}

export const OtpAction = {
    startTimer: START_TIMER,
    insertOtp: INSERT_OTP,
    deleteOtp: DELETE_OTP,
};

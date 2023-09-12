import {useReducer} from 'react';

import {useTheme} from '@app/context/theme';
import {useCountdown, useMemoizedCallback, useMount} from '@app/hooks';

import {otpActions} from './otp-screen.action';
import {initialState, reducer} from './otp-screen.reducer';

const TIME_LOCK = 5 * 60;
const INTERVAL_MS = 1000;
export const CODE_LENGTH = 4;

export const useOtpViewModel = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [count, {startCountdown, resetCountdown}] = useCountdown({
        countStart: TIME_LOCK,
        intervalMs: INTERVAL_MS,
    });

    const padLeftTimer = (string: string, pad: string | undefined, length: number) => {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    };

    const minutes = Math.floor(count / 60);
    const seconds = count - minutes * 60;

    const resendTime = `${padLeftTimer(minutes.toString(), '0', 2)}:${padLeftTimer(
        seconds.toString(),
        '0',
        2
    )}`;

    const init = useMemoizedCallback(() => {
        startCountdown();
    }, [startCountdown]);

    const restartCountdown = useMemoizedCallback(() => {
        resetCountdown();
        startCountdown();
    }, [resetCountdown, startCountdown]);

    useMount(init);

    const {theme} = useTheme();

    const onInsertOtp = useMemoizedCallback(
        num => {
            if (state.otp.length >= CODE_LENGTH) {
                return;
            }
            const newValue = state.otp.concat(num.toString());
            dispatch(otpActions.insertOtpAction(newValue));
        },
        [state.otp]
    );

    const onDeleteOtp = useMemoizedCallback(() => {
        const newvalue = state.otp.slice(0, -1);
        dispatch(otpActions.deleteOtpAction(newvalue));
    }, [state.otp]);
    return {
        resendTime,
        count,
        state,
        theme,
        onInsertOtp,
        onDeleteOtp,
        restartCountdown,
    };
};

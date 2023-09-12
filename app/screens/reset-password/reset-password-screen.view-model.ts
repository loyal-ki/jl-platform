import {useMemo, useReducer, useRef} from 'react';
import {useIntl} from 'react-intl';

import {Input} from '@app/components';
import {useTheme} from '@app/context';
import {useMemoizedCallback} from '@app/hooks';

import {resetPasswordActions} from './reset-password-screen.action';
import {initialState, resetPasswordReducer} from './reset-password-screen.reducer';
import {validateForm} from './reset-password-screen.validation';

export const useResetPasswordViewModel = () => {
    const intl = useIntl();
    const {theme} = useTheme();
    const {formatMessage} = intl;

    const passwordRef = useRef<React.ElementRef<typeof Input>>(null);
    const confirmPasswordRef = useRef<React.ElementRef<typeof Input>>(null);
    const [state, dispatch] = useReducer(resetPasswordReducer, initialState);
    const isFormValid = useMemo(() => {
        const validateResults = validateForm(state);
        if (!validateResults.isFormValid) {
            return false;
        }
        return true;
    }, [state]);

    const onPasswordChange = useMemoizedCallback(password => {
        dispatch(resetPasswordActions.setPasswordAction(password));
    }, []);

    const onConfirmPasswordChange = useMemoizedCallback(confirmPassword => {
        dispatch(resetPasswordActions.setConfirmPasswordAction(confirmPassword));
    }, []);

    return {
        theme,
        passwordRef,
        confirmPasswordRef,
        state,
        isFormValid,
        formatMessage,
        onPasswordChange,
        onConfirmPasswordChange,
    };
};

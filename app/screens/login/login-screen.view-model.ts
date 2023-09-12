import React, {useMemo, useReducer, useRef} from 'react';
import {useIntl} from 'react-intl';

import {Input} from '@app/components';
import {useTheme} from '@app/context/theme';
import {useMemoizedCallback} from '@app/hooks';
import {ScreensEnum, push} from '@app/navigation';

import {loginActions} from './login-screen.actions';
import {reducer, initialState} from './login-screen.reducer';
import {validateForm} from './login-screen.validation';

export const useViewModel = () => {
    const {theme} = useTheme();
    const intl = useIntl();
    const [state, dispatch] = useReducer(reducer, initialState);

    const {formatMessage} = intl;

    const emailRef = useRef<React.ElementRef<typeof Input>>(null);
    const passwordRef = useRef<React.ElementRef<typeof Input>>(null);

    const onEmailChange = useMemoizedCallback((text: string) => {
        dispatch(loginActions.setEmailAction(text));
    }, []);

    const onPasswordChange = useMemoizedCallback((text: string) => {
        dispatch(loginActions.setPasswordAction(text));
    }, []);

    const focusEmail = useMemoizedCallback(() => {
        emailRef?.current?.focus();
    }, []);

    const focusPassword = useMemoizedCallback(() => {
        passwordRef?.current?.focus();
    }, []);

    const isFormValid = useMemo(() => {
        const validateResults = validateForm(state);
        if (!validateResults.isFormValid) {
            return false;
        }
        return true;
    }, [state]);

    const onLogin = useMemoizedCallback(() => {
        push(ScreensEnum.OtpVerification);
    }, []);

    const onNavigationToRegister = useMemoizedCallback(() => {
        push(ScreensEnum.Register);
    }, []);

    const onNavigateToForgotPassword = useMemoizedCallback(() => {
        push(ScreensEnum.ForgotPassword);
    }, []);

    return {
        emailRef,
        passwordRef,
        state,
        theme,
        isFormValid,
        formatMessage,
        onEmailChange,
        onPasswordChange,
        focusEmail,
        focusPassword,
        onLogin,
        onNavigationToRegister,
        onNavigateToForgotPassword,
    };
};

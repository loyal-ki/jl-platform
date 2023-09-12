import {useMemo, useReducer, useRef} from 'react';
import {useIntl} from 'react-intl';

import {Input} from '@app/components';
import {useTheme} from '@app/context/theme';
import {useMemoizedCallback} from '@app/hooks';
import {ScreensEnum, goBack, push} from '@app/navigation';

import {registerActions} from './register.actions';
import {initialState, reducer} from './register.reducer';
import {validateForm} from './register.validation';

export const useRegisterViewModel = () => {
    const {theme} = useTheme();
    const intl = useIntl();

    const [state, dispatch] = useReducer(reducer, initialState);

    const {formatMessage} = intl;

    const emailRef = useRef<React.ElementRef<typeof Input>>(null);
    const passwordRef = useRef<React.ElementRef<typeof Input>>(null);
    const confirmPasswordRef = useRef<React.ElementRef<typeof Input>>(null);

    const onEmailChange = useMemoizedCallback((text: string) => {
        dispatch(registerActions.setEmailAction(text));
    }, []);

    const onPasswordChange = useMemoizedCallback((text: string) => {
        dispatch(registerActions.setPasswordAction(text));
    }, []);

    const onChangeShowPassword = useMemoizedCallback(() => {
        dispatch(registerActions.setShowPasswordAction(!state.isShowPassword));
    }, [state.isShowPassword]);

    const onChangeShowConfirmPassword = useMemoizedCallback(() => {
        dispatch(registerActions.setShowConfirmPasswordAction(!state.isShowConfirmPassword));
    }, [state.isShowConfirmPassword]);
    const onConfirmPasswordChange = useMemoizedCallback((text: string) => {
        dispatch(registerActions.setConfirmPasswordAction(text));
    }, []);

    const focusEmail = useMemoizedCallback(() => {
        emailRef?.current?.focus();
    }, []);

    const focusPassword = useMemoizedCallback(() => {
        passwordRef?.current?.focus();
    }, []);

    const focusConfirmPassword = useMemoizedCallback(() => {
        confirmPasswordRef?.current?.focus();
    }, []);

    const onChangeValuePolicy = useMemoizedCallback(() => {
        dispatch(registerActions.setIsAgreeWithPolicyAction(!state.agreeWithPolicy));
    }, [state.agreeWithPolicy]);

    const isFormValid = useMemo(() => {
        const validateResults = validateForm(state);
        if (!validateResults.isFormValid) {
            return false;
        }
        return true;
    }, [state]);

    const onRegister = useMemoizedCallback(() => {
        push(ScreensEnum.OtpVerification);
    }, []);

    const onGoBackToLogin = useMemoizedCallback(() => {
        goBack();
    }, []);

    return {
        emailRef,
        passwordRef,
        confirmPasswordRef,
        state,
        theme,
        isFormValid,
        formatMessage,
        onEmailChange,
        onPasswordChange,
        onConfirmPasswordChange,
        onChangeShowPassword,
        onChangeShowConfirmPassword,
        onChangeValuePolicy,
        focusEmail,
        focusPassword,
        focusConfirmPassword,
        onRegister,
        onGoBackToLogin,
    };
};

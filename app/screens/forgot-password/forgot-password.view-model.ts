import {useMemo, useReducer, useRef} from 'react';
import {useIntl} from 'react-intl';

import {Input} from '@app/components';
import {useTheme} from '@app/context/theme';
import {useMemoizedCallback} from '@app/hooks';
import {ScreensEnum, push} from '@app/navigation';

import {validateForm} from './forgot-password-validation';
import {forgotPasswordAction} from './forgot-password.action';
import {forgotPasswordReducer, initialState} from './forgot-password.reducer';

export const useForgotPasswordViewModel = () => {
    const intl = useIntl();
    const {theme} = useTheme();
    const {formatMessage} = intl;
    const [state, dispatch] = useReducer(forgotPasswordReducer, initialState);
    const emailRef = useRef<React.ElementRef<typeof Input>>(null);

    const onEmailChange = useMemoizedCallback((email: string) => {
        dispatch(forgotPasswordAction.setEmailAction(email));
    }, []);

    const focusEmail = useMemoizedCallback(() => {
        emailRef?.current?.focus();
    }, []);
    const isFormValid = useMemo(() => {
        const validateResults = validateForm(state);
        if (!validateResults.isFormValid) {
            return false;
        }
        return true;
    }, [state]);

    const onConfirmEmail = useMemoizedCallback(() => {
        push(ScreensEnum.ResetPassword);
    }, []);

    return {
        theme,
        emailRef,
        state,
        isFormValid,
        focusEmail,
        formatMessage,
        onEmailChange,
        onConfirmEmail,
    };
};

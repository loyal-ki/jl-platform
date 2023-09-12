import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useIntl} from 'react-intl';

import {HeaderTitle, ScreenStatusBar, generateScreenOptions} from '@app/components';
import {useTheme} from '@app/context';
import {AppLocalizationKeys} from '@app/localization/localization.keys';
import {
    LoginScreen,
    WelcomeScreen,
    DevModeScreen,
    DevFeaturesScreen,
    RegisterScreen,
    PinCodeScreen,
    ForgotPasswordScreen,
    RegistrationWizardScreen,
    VideoLearningDetailsScreen,
} from '@app/screens';
import {ResetPasswordScreen} from '@app/screens/reset-password';

import {ScreensEnum, ScreensParamList} from './enums/screens.enum';
import {useStackNavigatorStyleOptions} from './hooks';

import {ENABLE_DEV_MODE} from '@env/local_env';

const MainStack = createStackNavigator<ScreensParamList>();

export const MainStackScreen = () => {
    const {theme} = useTheme();
    const intl = useIntl();
    const {formatMessage} = intl;

    const styleScreenOptions = useStackNavigatorStyleOptions(theme);
    const shouldShowDevModeScreen = ENABLE_DEV_MODE && __DEV__;
    const shouldShowUnauthorizedScreens = true;

    return (
        <>
            <ScreenStatusBar />

            <MainStack.Navigator screenOptions={styleScreenOptions}>
                {shouldShowDevModeScreen && (
                    <>
                        <MainStack.Screen
                            name={ScreensEnum.DevMode}
                            component={DevModeScreen}
                            options={{headerShown: false}}
                        />
                        <MainStack.Screen
                            name={ScreensEnum.DevFeatures}
                            component={DevFeaturesScreen}
                            options={{headerShown: false}}
                        />
                    </>
                )}

                {shouldShowUnauthorizedScreens && (
                    <>
                        <MainStack.Screen
                            name={ScreensEnum.Welcome}
                            component={WelcomeScreen}
                            options={{headerShown: false}}
                        />
                        <MainStack.Screen
                            name={ScreensEnum.Login}
                            component={LoginScreen}
                            options={generateScreenOptions(
                                <HeaderTitle
                                    title={formatMessage({
                                        id: AppLocalizationKeys.login.page_title,
                                    })}
                                />
                            )}
                        />
                        <MainStack.Screen
                            name={ScreensEnum.Register}
                            component={RegisterScreen}
                            options={generateScreenOptions(
                                <HeaderTitle
                                    title={formatMessage({
                                        id: AppLocalizationKeys.register.page_title,
                                    })}
                                />
                            )}
                        />

                        <MainStack.Screen
                            name={ScreensEnum.OtpVerification}
                            component={PinCodeScreen}
                            options={generateScreenOptions(
                                <HeaderTitle
                                    title={formatMessage({id: AppLocalizationKeys.otp.title_page})}
                                />
                            )}
                        />
                        <MainStack.Screen
                            name={ScreensEnum.ForgotPassword}
                            component={ForgotPasswordScreen}
                            options={generateScreenOptions(
                                <HeaderTitle
                                    title={formatMessage({
                                        id: AppLocalizationKeys.forgot_password.page_title,
                                    })}
                                />
                            )}
                        />
                        <MainStack.Screen
                            name={ScreensEnum.ResetPassword}
                            component={ResetPasswordScreen}
                            options={generateScreenOptions(
                                <HeaderTitle
                                    title={formatMessage({
                                        id: AppLocalizationKeys.reset_password.page_title,
                                    })}
                                />
                            )}
                        />
                        <MainStack.Screen
                            name={ScreensEnum.RegistrationWizard}
                            component={RegistrationWizardScreen}
                            options={{headerShown: false}}
                        />

                        <MainStack.Screen
                            name={ScreensEnum.VideoLearningDetails}
                            component={VideoLearningDetailsScreen}
                            options={{headerShown: false}}
                        />
                    </>
                )}
            </MainStack.Navigator>
        </>
    );
};

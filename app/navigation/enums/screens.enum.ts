export enum ScreensEnum {
    DevMode = 'DevMode',
    DevFeatures = 'DevFeatures',
    Welcome = 'Welcome',
    Login = 'Login',
    Register = 'Register',
    OtpVerification = 'OtpVerification',
    ForgotPassword = 'ForgotPassword',
    ResetPassword = 'ResetPassword',
    RegistrationWizard = 'RegistrationWizard',
    VideoLearningDetails = 'VideoLearningDetails',
}

export type ScreensParamList = {
    [ScreensEnum.DevMode]: undefined;
    [ScreensEnum.DevFeatures]: undefined;
    [ScreensEnum.Welcome]: undefined;
    [ScreensEnum.Login]: undefined;
    [ScreensEnum.Register]: undefined;
    [ScreensEnum.OtpVerification]: undefined;
    [ScreensEnum.ResetPassword]: undefined;
    [ScreensEnum.ForgotPassword]: undefined;
    [ScreensEnum.RegistrationWizard]: undefined;
    [ScreensEnum.VideoLearningDetails]: undefined;
};

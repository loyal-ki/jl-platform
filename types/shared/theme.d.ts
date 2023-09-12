type ThemeType = 'dark' | 'light' | 'system';
type ThemeKey = 'dark' | 'light' | 'system';

type Theme = {
    type: ThemeType;
    background: string;
    primary: string;
    primarySecondary: string;
    text: string;
    textMessage: string;
    disableBackground: string;
    textDisable: string;

    // constants color
    success: string;
    warning: string;
    info: string;
    error: string;
    white: string;
    black: string;
    grey: string;
};

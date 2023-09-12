export enum AppThemeEnum {
    light = 'light',
    dark = 'dark',
    system = 'system',
}

// constant colors
export const ConstantColor = {
    success: '#50C19A',
    warning: '#FFD571',
    info: '#6DA9E4',
    error: '#D13E56',
    white: '#FFFFFF',
    black: '#000000',
    grey: '#F9F9F9',
};

export const Themes = {
    dark: {
        ...ConstantColor,
        type: 'dark',
        background: '#282A3A',
        primary: '#F2E5E5',
        primarySecondary: '#6B728E',
        text: '#1A1A2E',
        textMessage: '#373A40',
        textDisable: '#B2B2B2',
        disableBackground: '#CBCBCB',
    },
    light: {
        ...ConstantColor,
        type: 'light',
        background: '#FFFFFF',
        primary: '#40C1A2',
        primarySecondary: '#64CCC5',
        text: '#1A1A2E',
        textMessage: '#373A40',
        textDisable: '#B2B2B2',
        disableBackground: '#F5F5F5',
    },
} as Record<ThemeKey, Theme>;

type PreferencesInterface = {
    id: number | undefined;

    locale: string | undefined;

    persistedTheme: Theme | undefined;

    isFirstInstall: boolean;
};

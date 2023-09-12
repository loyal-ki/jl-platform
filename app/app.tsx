import {useFlipper} from '@react-navigation/devtools';
import React, {useState} from 'react';
import {LogBox, View} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';

import PortalHost from './components/portal/portal-host';
import {useMemoizedCallback, useMount} from './hooks';
import {initialize} from './initialize';
import {globalNavigationRef} from './navigation';
import {RootStackScreen} from './navigation/root-stack';
import store from './store';

import {UserLocaleProvider, ThemeProvider} from '@context';

import 'react-native-svg';

enableScreens();
LogBox.ignoreAllLogs();

export const App = () => {
    // only work during development and are disabled in production.
    useFlipper(globalNavigationRef);

    const [isLoading, setIsLoading] = useState(true);

    const onReady = useMemoizedCallback(async () => {
        const result = await initialize();
        if (result) {
            setIsLoading(false);
        }
    }, []);

    useMount(onReady);

    if (isLoading) {
        return <View />;
    }

    return (
        <Provider store={store}>
            <UserLocaleProvider>
                <ThemeProvider>
                    <PortalHost>
                        <RootStackScreen />
                    </PortalHost>
                </ThemeProvider>
            </UserLocaleProvider>
        </Provider>
    );
};

import React from 'react';
import {LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, initialWindowMetrics} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';

import {App} from './app';
import {AppCommonStyles} from './utils';

import 'react-native-svg';

enableScreens();
LogBox.ignoreAllLogs();

export const Root = () => {
    return (
        <GestureHandlerRootView style={AppCommonStyles.root}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <App />
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};

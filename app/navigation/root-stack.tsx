import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';

import {CurrentRouteNameContext} from './current-route-name.context';
import {ScreensEnum} from './enums/screens.enum';
import {StacksEnum} from './enums/stacks.enum';
import {useStackNavigationOptions} from './hooks/use-stack-navigation-options';
import {MainStackScreen} from './main-stack';
import {RootStackParamList, globalNavigationRef} from './navigation-service';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootStackScreen = () => {
    const screenOptions = useStackNavigationOptions();

    const [currentRouteName, setCurrentRouteName] = useState<ScreensEnum>(ScreensEnum.Welcome);

    const handleNavigationContainerStateChange = () =>
        setCurrentRouteName(globalNavigationRef.current?.getCurrentRoute()?.name as ScreensEnum);

    return (
        <NavigationContainer
            independent
            ref={globalNavigationRef}
            onReady={handleNavigationContainerStateChange}
            onStateChange={handleNavigationContainerStateChange}>
            <CurrentRouteNameContext.Provider value={currentRouteName}>
                <RootStack.Navigator screenOptions={screenOptions}>
                    <RootStack.Screen
                        name={StacksEnum.MainStack}
                        component={MainStackScreen}
                        options={{headerShown: false, headerTransparent: true}}
                    />
                </RootStack.Navigator>
            </CurrentRouteNameContext.Provider>
        </NavigationContainer>
    );
};

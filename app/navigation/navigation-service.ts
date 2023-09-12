import {
    NavigationContainerRef,
    StackActions,
    createNavigationContainerRef,
} from '@react-navigation/native';

import {ModalsParamList, ScreensParamList} from './enums';

export type RootStackParamList = {MainStack: undefined} & ModalsParamList;

export const globalNavigationRef =
    createNavigationContainerRef<NavigationContainerRef<RootStackParamList>>();

export function navigate<T extends keyof ScreensParamList>(name: T, params?: ScreensParamList[T]) {
    if (globalNavigationRef.isReady()) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        globalNavigationRef.navigate(name as any, params);
    }
}

export function push<T extends keyof ScreensParamList>(name: T, params?: ScreensParamList[T]) {
    if (globalNavigationRef.isReady()) {
        globalNavigationRef.dispatch(StackActions.push(name, params));
    }
}

export function replace<T extends keyof ScreensParamList>(name: T, params?: ScreensParamList[T]) {
    if (globalNavigationRef.isReady()) {
        globalNavigationRef.dispatch(StackActions.replace(name, params));
    }
}

export function goBack() {
    if (globalNavigationRef.isReady()) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        globalNavigationRef.canGoBack() && globalNavigationRef.goBack();
    }
}

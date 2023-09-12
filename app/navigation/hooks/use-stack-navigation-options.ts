import {StackNavigationOptions, TransitionPresets} from '@react-navigation/stack';
import {useMemo} from 'react';

export const useStackNavigationOptions = () => {
    return useMemo<StackNavigationOptions>(
        () => ({
            presentation: 'modal',
            cardOverlayEnabled: true,
            gestureEnabled: true,
            headerForceInset: {top: 'never', bottom: 'never'},
            ...TransitionPresets.ModalPresentationIOS,
        }),
        []
    );
};

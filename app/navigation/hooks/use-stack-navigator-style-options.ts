import {StackNavigationOptions} from '@react-navigation/stack';

import {formatSize, generateShadow} from '@app/utils';

export const useStackNavigatorStyleOptions = (theme: Theme): StackNavigationOptions => {
    return {
        headerStyle: {
            ...generateShadow(1, theme.grey),
            backgroundColor: theme.background,
            borderBottomWidth: formatSize(0.5),
            borderBottomColor: 'transparent',
        },
        headerTitleStyle: {color: theme.black},
        cardStyle: {backgroundColor: theme.background},
    };
};

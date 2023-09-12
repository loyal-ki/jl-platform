import React, {FC} from 'react';
import {StatusBar} from 'react-native';

import {useTheme} from '@app/context';

export const ScreenStatusBar: FC = () => {
    const {theme} = useTheme();

    return <StatusBar barStyle="dark-content" backgroundColor={theme.background} animated />;
};

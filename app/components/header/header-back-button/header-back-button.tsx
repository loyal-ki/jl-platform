import React, {FC} from 'react';

import {IconNameEnum} from '@app/components/icon';
import {useTheme} from '@app/context';
import {useNavigation} from '@app/navigation';
import {HeaderButton} from '@components/header/header-button';

export const HeaderBackButton: FC = () => {
    const {theme} = useTheme();
    const {goBack} = useNavigation();

    return (
        <HeaderButton color={theme.primary} iconName={IconNameEnum.ArrowLeft} onPress={goBack} />
    );
};

import React, {FC} from 'react';
import {Text} from 'react-native';

import {useTheme} from '@app/context';
import {conditionalStyle} from '@app/utils';

import {getHeaderTitleStyleSheet} from './header-title.styles';

interface Props {
    title: string;
    isWhite?: boolean;
}

export const HeaderTitle: FC<Props> = ({title, isWhite = false}) => {
    const {theme} = useTheme();
    const styles = getHeaderTitleStyleSheet(theme);

    return (
        <Text style={[styles.title, conditionalStyle(isWhite, styles.whiteColor)]}>
            {title.toUpperCase()}
        </Text>
    );
};

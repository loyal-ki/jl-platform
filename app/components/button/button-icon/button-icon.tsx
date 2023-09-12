import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';

import {Icon} from '@app/components/icon';
import {formatSize} from '@app/utils';

import {ButtonIconProps} from './button-icon.props';
import {getButtonIconStyleConfig} from './button-icon.styles';

export const ButtonIcon: FC<ButtonIconProps> = props => {
    const {theme, onPress, iconName, style} = props;

    const styleConfig = getButtonIconStyleConfig(theme);

    return (
        <TouchableOpacity style={[styleConfig.container, style]} onPress={onPress}>
            <Icon name={iconName} size={formatSize(24)} color={theme.primary} />
        </TouchableOpacity>
    );
};

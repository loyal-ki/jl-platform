import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {Icon, IconNameEnum} from '@app/components/icon';
import {TestIdProps} from '@app/models/interface';
import {formatSize} from '@app/utils';

interface Props extends TestIdProps {
    iconName: IconNameEnum;
    onPress: () => void;
    color?: string;
}

const HeaderButtonStyles = StyleSheet.create({
    icon: {
        marginHorizontal: formatSize(16),
    },
});

export const HeaderButton: FC<Props> = ({iconName, color, onPress, testID}) => (
    <TouchableOpacity style={HeaderButtonStyles.icon} onPress={onPress} testID={testID}>
        <Icon name={iconName} size={formatSize(24)} color={color} />
    </TouchableOpacity>
);

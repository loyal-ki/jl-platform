import React from 'react';
import {Pressable, View} from 'react-native';

import {Icon, IconNameEnum} from '../icon';

import {CheckBoxProps} from './checkbox.props';
import {checkboxStyles} from './checkbox.style';

export const CheckBox: React.FC<CheckBoxProps> = ({isChecked, onPress, theme}) => {
    const styles = checkboxStyles(theme);
    return (
        <View style={styles.container}>
            <Pressable onPress={onPress} style={{flex: 1}}>
                <Icon
                    name={isChecked ? IconNameEnum.AgreeCheck : IconNameEnum.DegreeCheck}
                    size={24}
                    color={isChecked ? theme.white : theme.grey}
                />
            </Pressable>
        </View>
    );
};

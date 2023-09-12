import React, {FC} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import {ButtonsContainerStyles} from './buttons-container.styles';

interface Props {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export const ButtonsContainer: FC<Props> = ({children, style}: Props) => (
    <View style={[ButtonsContainerStyles.container, style]}>{children}</View>
);

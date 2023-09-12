import {StyleProp, ViewStyle} from 'react-native';

import {IconNameEnum} from '@app/components/icon';
import {TestIdProps} from '@app/models/interface';

export interface ButtonIconProps extends TestIdProps {
    iconName: IconNameEnum;
    theme: Theme;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

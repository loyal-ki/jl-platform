import {StyleProp, ViewStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';

import {IconNameEnum} from './icon-name.enum';

import {TestIdProps} from '@models/interface/test-id.props';

export interface IconProps extends TestIdProps, SvgProps {
    name: IconNameEnum;
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
}

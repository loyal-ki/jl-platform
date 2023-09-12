import {Dimensions} from 'react-native';

import {layoutScale} from './scale';

export const formatSize = (size: number): number => size * layoutScale;
export const formatSizeScaled = (size: number): number =>
    size * layoutScale * Dimensions.get('window').fontScale;

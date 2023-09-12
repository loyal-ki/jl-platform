import {defaultTo} from 'lodash';
import React, {memo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Popup from './popup';

import type {PopupPageProps} from './popup.props';

const PopupPage: React.FC<PopupPageProps> = ({safeAreaInsetTop, style, ...restProps}) => {
    const insets = useSafeAreaInsets();

    const kSafeAreaInsetTop = defaultTo(safeAreaInsetTop, insets.top);

    return <Popup {...restProps} style={[{top: kSafeAreaInsetTop}, style]} position="bottom" />;
};

export default memo(PopupPage);

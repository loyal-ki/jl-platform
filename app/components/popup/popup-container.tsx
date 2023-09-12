import React, {memo} from 'react';

import {Portal} from '@components/portal';

import Popup from './popup';
import {PopupProps} from './popup.props';

const PopupContainer: React.FC<PopupProps> = props => {
    return (
        <Portal>
            <Popup {...props} />
        </Portal>
    );
};

export default memo(PopupContainer);

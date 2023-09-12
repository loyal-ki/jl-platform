import React, {memo} from 'react';

import {Portal} from '@components/portal';

import PopupPage from './popup-page';
import {PopupPageProps} from './popup.props';

const PopupPageContainer: React.FC<PopupPageProps> = props => {
    return (
        <Portal>
            <PopupPage {...props} />
        </Portal>
    );
};

export default memo(PopupPageContainer);

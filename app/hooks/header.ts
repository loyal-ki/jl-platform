import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {DEFAULT_HEADER_HEIGHT} from '@app/constants/view';

export const useDefaultHeaderHeight = () => {
    const insets = useSafeAreaInsets();

    const headerHeight = DEFAULT_HEADER_HEIGHT;

    return headerHeight + insets.top;
};

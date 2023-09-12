import omit from 'lodash/omit';

import type {PopupPosition} from './popup.props';
import type {ViewStyle} from 'react-native';

export const popupBackgroundColor = '#FFFFFF';
export const popupRoundBorderRadius = 16;
export const popupCloseIconSize = 24;
export const popupCloseIconColor = '#5A6068';
export const popupCloseIconMarginLeft = 8;

export const getBorderRadius = (position: PopupPosition, round: boolean): ViewStyle => {
    const borderRadius = round ? popupRoundBorderRadius : 0;
    return {
        borderTopLeftRadius: position === 'bottom' || position === 'right' ? borderRadius : 0,
        borderTopRightRadius: position === 'bottom' || position === 'left' ? borderRadius : 0,
        borderBottomLeftRadius: position === 'top' || position === 'right' ? borderRadius : 0,
        borderBottomRightRadius: position === 'top' || position === 'left' ? borderRadius : 0,
    };
};

const absolute = {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
};

export const PopupPositionMap: Record<PopupPosition, ViewStyle> = {
    center: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    left: omit(absolute, ['right']),
    right: omit(absolute, ['left']),
    top: omit(absolute, ['bottom']),
    bottom: omit(absolute, ['top']),
};

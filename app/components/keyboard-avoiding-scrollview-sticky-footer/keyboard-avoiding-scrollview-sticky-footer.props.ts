import {ReactNode} from 'react';

export interface IKeyboardAvoidingScrollViewStickyFooterProps {
    keyboardVerticalOffset?: number;
    StickyFooter?: React.ReactElement | null | undefined;
    children: ReactNode;
    scrollEnabled?: boolean;
    bottomInsetIfKeyboardShown: number;
    onScroll?: () => void;
}

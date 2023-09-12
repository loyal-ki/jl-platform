import {attachPropertiesToComponent} from '@app/utils';
import {memo} from 'react';
import PopupComponent from './popup';
import PopupPage from './popup-page';
import PopupPageContainer from './popup-page-container';
import PopupContainer from './popup-container';

export const Popup = attachPropertiesToComponent(memo(PopupContainer), {
    PopupComponent: PopupComponent,
    Page: PopupPageContainer,
    PageComponent: PopupPage,
});

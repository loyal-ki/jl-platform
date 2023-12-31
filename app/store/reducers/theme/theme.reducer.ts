import {createReducer} from 'typesafe-actions';

import {Themes} from '@app/constants/themes';
import {themeActions} from '@app/store/actions/theme/theme.action';

import {IThemeActionType} from '@store/actions/actions.types';

export const initState: ThemeStateInterface = {
    theme: Themes.light,
};

export const themeReducer = createReducer<ThemeStateInterface, IThemeActionType>(initState)
    .handleAction(themeActions.fetchThemeFromDbRequest, (state, _) => {
        return {
            ...state,
        };
    })
    .handleAction(themeActions.fetchThemeFromDbSuccess, (state, {payload: {theme}}) => {
        return {
            ...state,
            theme,
        };
    })
    .handleAction(themeActions.setThemeToDbRequest, (state, {payload: {theme}}) => {
        return {
            ...state,
            theme,
        };
    });

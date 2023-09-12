import {localeActions} from './locale/locale.action';
import {themeActions} from './theme/theme.action';

import type {ActionType} from 'typesafe-actions';

export type ILocaleActionType = ActionType<typeof localeActions>;

export type IThemeActionType = ActionType<typeof themeActions>;

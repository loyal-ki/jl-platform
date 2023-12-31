import {AnyAction, combineReducers} from 'redux';

import {localeReducer} from './reducers';
import {themeReducer} from './reducers/theme/theme.reducer';

const appReducer = combineReducers({
    locale: localeReducer,
    theme: themeReducer,
});

export type ReduxAppState = ReturnType<typeof appReducer>;

const rootReducer = (state: ReduxAppState, action: AnyAction): ReduxAppState => {
    const appState: ReduxAppState | undefined = state;
    return appReducer(appState, action);
};

export default rootReducer;

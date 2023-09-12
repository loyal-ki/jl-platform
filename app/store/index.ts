import {applyMiddleware, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import createDebugger from 'redux-flipper';
import logger from 'redux-logger';

import rootEpic from './rootEpic';
import appReducer, {ReduxAppState} from './rootReducer';
import {ENABLE_REDUX_FLIPPER, ENABLE_REDUX_LOGGER} from '@env/local_env';

const devMiddleware = [
    ...(ENABLE_REDUX_FLIPPER ? [createDebugger()] : []),
    ...(ENABLE_REDUX_LOGGER ? [logger] : []),
];

export const initializeStore = (production = false) => {
    const epicMiddleware = createEpicMiddleware<any, any, ReduxAppState>();

    const store = createStore(appReducer, applyMiddleware(epicMiddleware, ...[...devMiddleware]));

    epicMiddleware.run(rootEpic);

    return store;
};

const defaultStore = initializeStore();
export default defaultStore;

// @flow
import { compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { DEV } from './parameters';
import rootReducer from './../reducers';
import getRootMiddleware from './../middlewares';

const PERSIST_CONFIG = {
    whitelist: ['auth'],
    key: 'root',
    storage,
    debug: !!DEV,
};

export default function configureStore(history) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        persistReducer(PERSIST_CONFIG, rootReducer),
        composeEnhancers(getRootMiddleware(history)),
    );
    const persistor = persistStore(store);

    return { store, persistor };
}

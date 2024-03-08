import {configureStore, combineReducers} from '@reduxjs/toolkit';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index.saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

let rootReducer = combineReducers(reducers);

let persistConfig = {key: 'root', storage: AsyncStorage};

let persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

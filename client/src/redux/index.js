import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import {
    persistStore,
    persistReducer,
    REGISTER,
    PERSIST,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [PERSIST, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
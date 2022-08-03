import { configureStore } from '@reduxjs/toolkit';
 import char from '../slices/charSlice';
 import heroes from '../slices/heroesSlice'
import episode from '../slices/episodeSlice';

export const store = configureStore({
    reducer: {char, heroes, episode},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import globalReducer from '../models/global';
import reduxLogger from 'redux-logger';

export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
  middleware: [reduxLogger],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authLoginSlice from '../features/auth/userAuthSlice';
import messageSlice from '../features/messages/messageSlice';
import postSlice from '../features/post/postSlice';

export const store = configureStore({
  reducer: {
    authUser: authLoginSlice,
    message: messageSlice,
    leads: postSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

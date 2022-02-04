import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isMessage: false,
  isError: false,
  message: '',
  error: '',
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,

  reducers: {
    clearMessageState: (state) => {
      state.isMessage = false;
      state.message = '';
    },

    clearErrorMessage: (state) => {
      state.isError = false;
      state.error = '';
    },

    loggedInSuccess: (state) => {
      state.isError = false;
      state.error = '';
    },
    setUserSuccess: (state, action: PayloadAction<any>) => {
      let { username } = action.payload.user;
      state.isMessage = true;
      state.message = `${username} successfully logged in`;
    },
    registerSuccess: (state, action: PayloadAction<any>) => {
      let { username } = action.payload.user;
      state.isMessage = true;
      state.message = `${username} successfully registed`;
      state.isError = false;
      state.error = '';
    },
    authFail: (state, action: PayloadAction<any>) => {
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const {
  clearMessageState,
  clearErrorMessage,
  loggedInSuccess,
  setUserSuccess,
  registerSuccess,
  authFail,
} = messageSlice.actions;
export default messageSlice.reducer;

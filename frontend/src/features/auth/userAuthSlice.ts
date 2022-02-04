import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  user: {
    id: '',
    username: '',
    email: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setLoadingState: (state) => {
      state.isLoading = true;
    },

    clearLoadingState: (state) => {
      state.isLoading = false;
    },

    setLogoutState: (state) => {
      state.user.id = '';
      state.user.username = '';
      state.user.email = '';
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.setItem('token', '');
      state.token = '';
    },

    setLoggedInUser: (state, action: PayloadAction<any>) => {
      let { id, email, username } = action.payload;
      state.user.id = id;
      state.user.username = username;
      state.user.email = email;
      state.isAuthenticated = true;
      state.isLoading = false;
    },

    setUserState: (state, action) => {
      let { id, email, username } = action.payload.user;
      localStorage.setItem('token', action.payload.token);
      state.user.id = id;
      state.user.username = username;
      state.user.email = email;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },

    setRegisterState: (state, action: PayloadAction<any>) => {
      let { id, email, username } = action.payload.user;
      state.user.id = id;
      state.user.username = username;
      state.user.email = email;
      state.isLoading = false;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },

    setUserFail: (state) => {
      state.user.id = '';
      state.user.username = '';
      state.user.email = '';
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.setItem('token', '');
      state.token = '';
    },

    setAuthFail: (state) => {
      state.user.id = '';
      state.user.username = '';
      state.user.email = '';
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.setItem('token', '');
      state.token = '';
    },
  },
});

export const {
  setLogoutState,
  setLoadingState,
  setUserFail,
  setAuthFail,
  clearLoadingState,
  setLoggedInUser,
  setRegisterState,
  setUserState,
} = authSlice.actions;

export default authSlice.reducer;

export const commonReducerReject = (state: any) => {
  state.user.id = null;
  state.user.username = '';
  state.user.email = '';
  state.isAuthenticated = false;
  state.isLoading = false;
  localStorage.setItem('token', '');
  state.token = '';
};

export const commonReducerAccept = (state: any, action: any) => {
  state.user.id = action.payload.id;
  state.user.username = action.payload.username;
  state.user.email = action.payload.email;
  state.isAuthenticated = true;
  state.isLoading = false;
  state.isError = false;
  state.error = '';
};

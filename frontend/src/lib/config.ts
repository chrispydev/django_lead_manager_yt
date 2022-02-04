export const tokenConfig = (getState: string | null) => {
  // Get token from state
  const token = getState;
  // Headers
  const config: any = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};

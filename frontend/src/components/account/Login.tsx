import axios from 'axios';
import { useState } from 'react';

import { Link, Redirect } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  setAuthFail,
  setLoadingState,
  setUserState,
} from '../../features/auth/userAuthSlice';
import { authFail, setUserSuccess } from '../../features/messages/messageSlice';

export default function Login() {
  const { isAuthenticated } = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onsubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    dispatch(setLoadingState());

    axios
      .post('http://localhost:8000/api/auth/login', {
        username: username,
        password: password,
      })
      .then(function (response) {
        dispatch(setUserSuccess(response.data));
        dispatch(setUserState(response.data));
        <Redirect to='/dashboard' />;
      })
      .catch((error) => {
        const data = error.response.data;
        dispatch(authFail(data['non_field_errors'].toString()));
        dispatch(setAuthFail());
      });
  };

  return (
    <>
      <div className='col-md-6 m-auto'>
        <div className='card card-body mt-5'>
          <h2 className='text-center'>Login</h2>
          <form onSubmit={onsubmit}>
            <div className='form-group'>
              <label>Username</label>
              <input
                type='text'
                className='form-control'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label>Password</label>
              <input
                type='password'
                className='form-control'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <button
                disabled={username.length === 0 || password.length === 0}
                // disabled={true}
                className='btn btn-primary'
              >
                Login
              </button>
            </div>
            <p>
              Don't have an account? <Link to='/register'>Register</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

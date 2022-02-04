import axios from 'axios';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { Link, Redirect } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import {
  clearLoadingState,
  setAuthFail,
  setLoadingState,
  setRegisterState,
} from '../../features/auth/userAuthSlice';
import {
  authFail,
  registerSuccess,
} from '../../features/messages/messageSlice';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const alert = useAlert();

  const dispatch = useAppDispatch();

  const register = (event: any) => {
    event.preventDefault();

    dispatch(setLoadingState());

    if (password1 !== password2) {
      alert.error('Password does not match');
      event.stopPropagation();
      dispatch(clearLoadingState());
    }

    axios
      .post('http://localhost:8000/api/auth/register', {
        username: username,
        email: email,
        password: password1,
      })
      .then((res) => {
        dispatch(registerSuccess(res.data));
        dispatch(setRegisterState(res.data));
        <Redirect to='/login' />;
      })
      .catch((err) => {
        dispatch(authFail(err.response.data['username'].toString()));
        dispatch(setAuthFail());
      });
  };

  return (
    <div className='col-md-6 m-auto'>
      <div className='card card-body mt-5'>
        <h2 className='text-center'>Register</h2>
        <form onSubmit={register}>
          <div className='form-group'>
            <label>Username</label>
            <input
              type='text'
              className='form-control'
              name='username'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              className='form-control'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              className='form-control'
              name='password'
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>Confirm Password</label>
            <input
              type='password'
              className='form-control'
              name='password2'
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary'>
              Register
            </button>
          </div>
          <p>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

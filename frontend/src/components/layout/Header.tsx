import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { setLogoutState } from '../../features/auth/userAuthSlice';
import { tokenConfig } from '../../lib/config';

export default function Header() {
  const { isAuthenticated, user } = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();

  const logout = () => {
    axios
      .post(
        'http://localhost:8000/api/auth/logout/',
        null,
        tokenConfig(localStorage.getItem('token'))
      )
      .then((res) => {
        dispatch(setLogoutState());
        <Redirect to='/login' />;
      })
      .catch((err) => {});
  };

  const authLinks = (
    <ul className='navbar-nav ml-auto mt-2 mt-lg-0 z__header'>
      <span className='navbar-text mr-3'>
        <strong>{user ? `Welcome ${user.username}` : ''}</strong>
      </span>
      <li className='nav-item'>
        <button
          onClick={logout}
          className='nav-link btn btn-info btn-sm text-light'
        >
          Logout
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
      <li className='nav-item'>
        <Link to='/register' className='nav-link'>
          Register
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/login' className='nav-link'>
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar navbar-expand-sm navbar-light bg-light'>
      <div className='container'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarTogglerDemo01'
          aria-controls='navbarTogglerDemo01'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarTogglerDemo01'>
          <a className='navbar-brand' href='/'>
            Lead Manager
          </a>
        </div>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
}

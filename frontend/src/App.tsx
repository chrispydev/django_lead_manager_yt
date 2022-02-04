import axios from 'axios';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  setUserFail,
  setLoggedInUser,
  setLoadingState,
} from './features/auth/userAuthSlice';

import { loggedInSuccess } from './features/messages/messageSlice';

import './App.css';

import Login from './components/account/Login';
import Register from './components/account/Register';
import Header from './components/layout/Header';
import Dashboard from './components/leads/Dashboard';

import { tokenConfig } from './lib/config';
import { useAppSelector } from './app/hooks';
import Loading from './components/layout/Loading';
import NotFoundPage from './components/layout/NotFoundPage';
import Alerts from './components/layout/Alerts';

function App() {
  const { isLoading, isAuthenticated } = useAppSelector(
    (state) => state.authUser
  );
  const dispatch = useDispatch();

  useEffect((): any => {
    dispatch(setLoadingState());
    const token = localStorage.getItem('token');

    async function loadUser() {
      axios
        .get('http://localhost:8000/api/auth/user', tokenConfig(token))
        .then((res) => {
          dispatch(loggedInSuccess());
          dispatch(setLoggedInUser(res.data));
        })
        .catch((err) => {
          dispatch(setUserFail());
        });
    }
    return loadUser();
  }, []);

  return (
    <Router>
      <Header />
      <Alerts />
      {isLoading && <Loading />}
      <div className='container'>
        <Switch>
          {isAuthenticated ? (
            <>
              <Redirect to='/' />
              <Route exact path='/' component={Dashboard} />
            </>
          ) : (
            <>
              <Redirect to='login' />
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
            </>
          )}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

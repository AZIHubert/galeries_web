import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import AnimatedRoute from '#components/AnimatedRoute';
import Desktop from '#containers/Desktop';
import Header from '#containers/Header';
import Profile from '#containers/Profile';

import Loader from '#components/Loader';

import ConfirmAccount from '#containers/ConfirmAccount';
import Home from '#containers/Home';
import ResetPassword from '#containers/ResetPassword';

import { fetchUser } from '#store/actions';
import {
  userSelector,
  loadingSelector,
} from '#store/selectors';

import {
  localStorages,
} from '#store/constant';

const Container = styled.div`
  left: 0;
  position: absolute;
  right: 0;
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: 500ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: 500ms;
  }
`;

const token = localStorage.getItem(localStorages.AUTH_TOKEN);
const expiresIn = localStorage.getItem(localStorages.EXPIRES_DATE_TOKEN);

const Routes = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const user = useSelector(userSelector);
  const [allowRedirect, setAllowRedirect] = React.useState<boolean>(false);
  React.useEffect(() => {
    const timer = setTimeout(() => setAllowRedirect(true), 2000);
    if (token && expiresIn) {
      dispatch(fetchUser());
    }
    return () => clearTimeout(timer);
  }, []);
  console.log('allowRedirect', allowRedirect);
  return (
    <Router>
      <CSSTransition
        classNames='fade'
        in={!allowRedirect || loading}
        timeout={300}
        unmountOnExit
      >
        <Container>
          <Loader />
        </Container>
      </CSSTransition>
      <CSSTransition
        classNames='fade'
        in={allowRedirect}
        timeout={300}
        unmountOnExit
      >
        <Container>
          <AnimatedRoute
            path='/'
          >
            {user ? (
              <Redirect to='/dashboard' />
            ) : (
              <Home />
            )}
          </AnimatedRoute>
          <AnimatedRoute
            path='/confirmation/:token'
          >
            {user ? (
              <Redirect to='/dashboard' />
            ) : (
              <ConfirmAccount />
            )}
          </AnimatedRoute>
          <AnimatedRoute
            path='/resetPassword/:token'
          >
            {user ? (
              <Redirect to='/dashboard' />
            ) : (
              <ResetPassword />
            )}
          </AnimatedRoute>
          {!user ? (
            <Redirect to='/' />
          ) : (
            <>
              <Header />
              <AnimatedRoute
                path='/dashboard'
              >

                <Desktop />
              </AnimatedRoute>
              <AnimatedRoute
                path='/profile'
              >
                <Profile />
              </AnimatedRoute>
            </>
          )}
        </Container>
      </CSSTransition>
    </Router>
  );
};

export default Routes;

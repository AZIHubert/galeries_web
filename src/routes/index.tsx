import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Redirect,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import AnimatedRoute from '#components/AnimatedRoute';

import ConfirmAccount from '#containers/ConfirmAccount';
import Desktop from '#containers/Desktop';
import Edit from '#containers/Edit';
import FullPageImage from '#containers/FullPageImage';
import Header from '#containers/Header';
import Home from '#containers/Home';
import Loader from '#components/Loader';
import Profile from '#containers/Profile';
import ResetPassword from '#containers/ResetPassword';

import { fetchInitUser } from '#store/actions';
import {
  initSelector,
  userSelector,
} from '#store/selectors';

import {
  Fader,
} from './styles';

const Routes = () => {
  const dispatch = useDispatch();
  const init = useSelector(initSelector);
  const user = useSelector(userSelector);
  const [allowRedirect, setAllowRedirect] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setAllowRedirect(true), 2000);
    dispatch(fetchInitUser());
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CSSTransition
        classNames='fade'
        in={init || !allowRedirect}
        timeout={300}
        unmountOnExit
      >
        <Fader>
          <Loader />
        </Fader>
      </CSSTransition>
      <CSSTransition
        classNames='fade'
        in={allowRedirect && !init}
        timeout={300}
        unmountOnExit
      >
        <Fader>
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
          <AnimatedRoute
            path='/dashboard'
          >
            {!user ? (
              <Redirect to='/' />
            ) : (
              <Desktop />
            )}
          </AnimatedRoute>
          <AnimatedRoute
            path='/profile'
          >
            {!user ? (
              <Redirect to='/' />
            ) : (
              <Profile />
            )}
          </AnimatedRoute>
          <AnimatedRoute
            path='/profilePicture/:id'
          >
            {!user ? (
              <Redirect to='/' />
            ) : (
              <FullPageImage />
            )}
          </AnimatedRoute>
          <AnimatedRoute
            path='/edit'
          >
            {!user ? (
              <Redirect to='/' />
            ) : (
              <Edit />
            )}
          </AnimatedRoute>
          <Header.Desktop />
        </Fader>
      </CSSTransition>
    </>
  );
};

export default Routes;

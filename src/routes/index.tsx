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
import Loader from '#components/Loader';
import Modal from '#components/Modal';
import ModalCallback from '#components/ModalCallback';

import ConfirmAccount from '#containers/ConfirmAccount';
import Home from '#containers/Home';
import ResetPassword from '#containers/ResetPassword';

import { fetchUser } from '#store/actions';
import {
  userSelector,
  uiSelector,
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
  const loading = useSelector(uiSelector);
  const user = useSelector(userSelector);
  const [allowRedirect, setAllowRedirect] = React.useState<boolean>(false);
  const [callbackModal, setCallbackModal] = React.useState<{
    error: boolean;
    open: boolean;
    text: string;
  }>({
    error: false,
    open: false,
    text: '',
  });
  React.useEffect(() => {
    const timer = setTimeout(() => setAllowRedirect(true), 2000);
    if (token && expiresIn) {
      dispatch(fetchUser());
    }
    return () => clearTimeout(timer);
  }, []);
  return (
    <Router>
      <CSSTransition
        classNames='fade'
        in={!allowRedirect || !loading}
        timeout={300}
        unmountOnExit
      >
        <Container>
          <Loader />
        </Container>
      </CSSTransition>
      <CSSTransition
        classNames='fade'
        in={allowRedirect && loading}
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
            onExiting={() => setCallbackModal((prevState) => ({
              ...prevState,
              open: true,
            }))}
            path='/confirmation/:token'
          >
            {user ? (
              <Redirect to='/dashboard' />
            ) : (
              <ConfirmAccount />
            )}
          </AnimatedRoute>
          <AnimatedRoute
            onExiting={() => setCallbackModal((prevState) => ({
              ...prevState,
              open: true,
            }))}
            path='/resetPassword/:token'
          >
            {user ? (
              <Redirect to='/dashboard' />
            ) : (
              <ResetPassword />
            )}
          </AnimatedRoute>
          <AnimatedRoute
            onExiting={() => setCallbackModal((prevState) => ({
              ...prevState,
              open: true,
            }))}
            path='/dashboard'
          >
            {!user ? (
              <Redirect to='/' />
            ) : (
              <Desktop />
            )}
          </AnimatedRoute>
          <Modal
            callBack={() => setCallbackModal((prevState) => ({
              ...prevState,
              text: '',
            }))}
            handleClose={() => setCallbackModal((prevState) => ({
              ...prevState,
              open: false,
            }))}
            open={callbackModal.open && !!callbackModal.text}
          >
            <ModalCallback
              text={callbackModal.text}
              variant={callbackModal.error ? 'error' : 'primary'}
            />
          </Modal>
        </Container>
      </CSSTransition>
    </Router>
  );
};

export default Routes;

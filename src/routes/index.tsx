import axios from 'axios';
import * as React from 'react';
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

import { UserContext } from '#contexts/UserContext';

import { getMe } from '#helpers/api';
import verifyTokens from '#helpers/verifyTokens';

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

const authTokenExist = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    return true;
  }
  return false;
};

const Routes = () => {
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
  const [requestFinish, setRequestFinish] = React.useState<boolean>(false);
  const { setUser, user } = React.useContext(UserContext);
  React.useEffect(() => {
    const source = axios.CancelToken.source();
    const timer = setTimeout(() => setAllowRedirect(true), 2000);
    const handleMe = async () => {
      try {
        await verifyTokens();
        const response = await getMe({ source });
        setUser(response.data);
      } catch (err) {
        localStorage.clear();
      }
      setRequestFinish(true);
    };
    if (!authTokenExist()) {
      setRequestFinish(true);
    } else {
      handleMe();
    }
    return () => {
      console.log('unmount');
      source.cancel('axios request cancelled');
      clearTimeout(timer);
    };
  }, []);
  return (
    <Router>
      <CSSTransition
        classNames='fade'
        in={!allowRedirect || !requestFinish}
        timeout={300}
        unmountOnExit
      >
        <Container>
          <Loader />
        </Container>
      </CSSTransition>
      <CSSTransition
        classNames='fade'
        in={allowRedirect && requestFinish}
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
              <ConfirmAccount
                setCallbackModal={setCallbackModal}
              />
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
              <ResetPassword
                setCallbackModal={setCallbackModal}
              />
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

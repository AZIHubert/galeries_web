import * as React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';

import AnimatedRoute from '#components/AnimatedRoute';
import Desktop from '#containers/Desktop';
import Modal from '#components/Modal';
import ModalCallback from '#components/ModalCallback';

import ConfirmAccount from '#containers/ConfirmAccount';
import Home from '#containers/Home';
import ResetPassword from '#containers/ResetPassword';

const authTokenExist = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    return true;
  }
  return false;
};

const Routes = () => {
  const [callbackModal, setCallbackModal] = React.useState<{
    error: boolean;
    open: boolean;
    text: string;
  }>({
    error: false,
    open: false,
    text: '',
  });
  return (
    <Router>
      <AnimatedRoute
        exact
        path='/'
      >
        {authTokenExist() ? (
          <Redirect to='/dashboard' />
        ) : (
          <Home />
        )}
      </AnimatedRoute>
      <AnimatedRoute
        exact
        onExiting={() => setCallbackModal((prevState) => ({
          ...prevState,
          open: true,
        }))}
        path='/confirmation/:token'
      >
        {authTokenExist() ? (
          <Redirect to='/dashboard' />
        ) : (
          <ConfirmAccount
            setCallbackModal={setCallbackModal}
          />
        )}
      </AnimatedRoute>
      <AnimatedRoute
        exact
        onExiting={() => setCallbackModal((prevState) => ({
          ...prevState,
          open: true,
        }))}
        path='/resetPassword/:token'
      >
        {!authTokenExist() ? (
          <Redirect to='/dashboard' />
        ) : (
          <ResetPassword
            setCallbackModal={setCallbackModal}
          />
        )}
      </AnimatedRoute>
      <AnimatedRoute
        exact
        onExiting={() => setCallbackModal((prevState) => ({
          ...prevState,
          open: true,
        }))}
        path='/dashboard'
      >
        <Desktop />
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
    </Router>
  );
};

export default Routes;

import * as React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import AnimatedRoute from '#components/AnimatedRoute';
import Modal from '#components/Modal';
import ModalCallback from '#components/ModalCallback';

import Home from '#containers/Home';
import ConfirmAccount from '#containers/ConfirmAccount';
import ResetPassword from '#containers/ResetPassword';

const Routes = () => {
  const [callbackModal, setCallbackModal] = React.useState<{
    open: boolean;
    error: boolean;
    text: string;
  }>({
    open: false,
    error: false,
    text: '',
  });
  return (
    <Router>
      <AnimatedRoute
        exact
        path='/'
      >
        <Home />
      </AnimatedRoute>
      <AnimatedRoute
        exact
        onExisted={() => setCallbackModal((prevState) => ({
          ...prevState,
          open: true,
        }))}
        path='/confirmation/:token'
      >
        <ConfirmAccount
          setCallbackModal={setCallbackModal}
        />
      </AnimatedRoute>
      <AnimatedRoute
        exact
        onExisted={() => setCallbackModal((prevState) => ({
          ...prevState,
          open: true,
        }))}
        path='/resetPassword/:token'
      >
        <ResetPassword
          setCallbackModal={setCallbackModal}
        />
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

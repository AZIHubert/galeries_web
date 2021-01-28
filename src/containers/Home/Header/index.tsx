import * as React from 'react';

import Modal from '#components/Modal';

import PopupLogin from './PopupLogin';
import PopupSignin from './PopupSignin';

const Header = () => {
  const [loading, setLoading] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignin, setOpenSignin] = React.useState(false);

  const handleClickLogin = () => {
    if (!loading) {
      setOpenSignin(false);
      setOpenLogin(!openLogin);
    }
  };
  const handleClickSignin = () => {
    if (!loading) {
      setOpenLogin(false);
      setOpenSignin(!openSignin);
    }
  };
  const handleCloseLoginModal = () => {
    if (!loading) setOpenLogin(false);
  };
  const handleCloseSigninModal = () => {
    if (!loading) setOpenSignin(false);
  };

  return (
    <header>
      <button
        onClick={handleClickSignin}
        data-testid='openSignin'
      >
        signin
      </button>
      <button
        data-testid='openLogin'
        onClick={handleClickLogin}
      >
        login
      </button>
      <Modal
        open={openLogin}
        handleClose={handleCloseLoginModal}
      >
        <PopupLogin
          loading={loading}
          setLoading={setLoading}
        />
      </Modal>
      <Modal
        open={openSignin}
        handleClose={handleCloseSigninModal}
      >
        <PopupSignin
          loading={loading}
          setLoading={setLoading}
        />
      </Modal>
    </header>
  );
};

export default Header;

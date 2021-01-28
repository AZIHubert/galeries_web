import * as React from 'react';

import Modal from '#components/Modal';
import logo from '#ressources/svg/logoG.svg';

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
  const handleCloseModal = () => {
    if (!loading) {
      setOpenLogin(false);
      setOpenSignin(false);
    }
  };

  return (
    <header>
      <img src={logo} alt="header logo" />
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
        open={openLogin || openSignin}
        handleClose={handleCloseModal}
      >
        {openLogin && <PopupLogin
          loading={loading}
          setLoading={setLoading}
        />}
        {openSignin && <PopupSignin
          loading={loading}
          setLoading={setLoading}
        />}
      </Modal>
    </header>
  );
};

export default Header;

import * as React from 'react';

import Modal from '#components/Modal';
import logo from '#ressources/svg/logoG.svg';

import ModalVerifyAccount from './ModalVerifyAccount';
import ModalLogin from './ModalLogin';
import ModalSignin from './ModalSignin';

const Header = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [openLogin, setOpenLogin] = React.useState<boolean>(false);
  const [openSignin, setOpenSignin] = React.useState<boolean>(false);
  const [accountCreate, setAccountCreate] = React.useState<boolean>(false);

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

  const LoggerModal = accountCreate ? (
    <ModalVerifyAccount
      loading={loading}
      setLoading={setLoading}
    />
  ) : (
    <ModalSignin
      loading={loading}
      setAccountCreate={setAccountCreate}
      setLoading={setLoading}
      switchModal={handleClickLogin}
    />
  );

  return (
    <header>
      <img
        src={logo}
        alt="header logo"
      />
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
        {openLogin && (
          <ModalLogin
            loading={loading}
            setLoading={setLoading}
            switchModal={handleClickSignin}
          />
        )}
        {openSignin && LoggerModal}
      </Modal>
    </header>
  );
};

export default Header;

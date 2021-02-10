import * as React from 'react';

import HeaderButton from '#components/HeaderButton';
import Modal from '#components/Modal';
import ModalTimer from '#components/ModalTimer';

import logo from '#ressources/svg/logoG.svg';

import ModalForgotPassword from './ModalForgotPassword';
import ModalLogin from './ModalLogin';
import ModalSignin from './ModalSignin';
import ModalValidateResetPassword from './ModalValidateResetPassword';
import ModalVerifyAccount from './ModalVerifyAccount';

import {
  ButtonContainer,
  Container,
  InnerContainer,
  Logo,
} from './styles';

const Header = () => {
  const [accountCreate, setAccountCreate] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [forgotPassword, setForgotPassword] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [openError, setOpenError] = React.useState<boolean>(false);
  const [openLogin, setOpenLogin] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openSignin, setOpenSignin] = React.useState<boolean>(false);
  const [validateResetPassword, setValidateResetPassword] = React.useState<boolean>(false);
  const [currentEmail, setCurrentEmail] = React.useState<string>('');

  const handleClickLogin = () => {
    if (!loading) {
      resetModals();
      setOpenModal(true);
      setOpenLogin(true);
    }
  };
  const handleClickSignin = () => {
    if (!loading) {
      resetModals();
      setOpenModal(true);
      setOpenSignin(true);
    }
  };
  const handleCloseModal = () => {
    if (!loading) {
      setOpenModal(false);
      setOpenError(false);
    }
  };
  const switchToValidateResetPassword = () => {
    if (!loading) {
      setForgotPassword(false);
      setValidateResetPassword(true);
    }
  };

  const resetModals = () => {
    setAccountCreate(false);
    setForgotPassword(false);
    setOpenError(false);
    setOpenLogin(false);
    setOpenSignin(false);
    setValidateResetPassword(false);
  };

  const signerModal = accountCreate ? (
    <ModalVerifyAccount
      currentEmail={currentEmail}
      loading={loading}
      setError={setError}
      setLoading={setLoading}
      setOpenError={setOpenError}
    />
  ) : (
    <ModalSignin
      loading={loading}
      setAccountCreate={setAccountCreate}
      setCurrentEmail={setCurrentEmail}
      setError={setError}
      setLoading={setLoading}
      setOpenError={setOpenError}
      switchModal={handleClickLogin}
    />
  );
  const LoginModal = () => {
    if (forgotPassword) {
      return (
        <ModalForgotPassword
          setCurrentEmail={setCurrentEmail}
          setOpenError={setOpenError}
          setError={setError}
          setForgotPassword={setForgotPassword}
          setLoading={setLoading}
          loading={loading}
          switchModal={switchToValidateResetPassword}
        />
      );
    }
    if (validateResetPassword) {
      return (
        <ModalValidateResetPassword
          currentEmail={currentEmail}
          loading={loading}
          setError={setError}
          setLoading={setLoading}
        />
      );
    }
    return (
      <ModalLogin
        loading={loading}
        setError={setError}
        setForgotPassword={setForgotPassword}
        setLoading={setLoading}
        setOpenError={setOpenError}
        switchModal={handleClickSignin}
      />
    );
  };

  return (
    <Container>
      <InnerContainer>
        <Logo
          src={logo}
          alt="header logo"
        />
        <ButtonContainer>
          <HeaderButton
            testId='openSignin'
            marginRight={30}
            onClick={handleClickSignin}
            title='Sign in'
          />
          <HeaderButton
            testId='openLogin'
            onClick={handleClickLogin}
            variant='secondary'
            title='Log in'
          />
        </ButtonContainer>
        <Modal
          callBack={resetModals}
          open={openModal}
          handleClose={handleCloseModal}
        >
          {openLogin && LoginModal()}
          {openSignin && signerModal}
          <ModalTimer
            callBack={() => setError('')}
            handleClose={() => setOpenError(false)}
            open={openError}
            text={error}
            variant='danger'
          />
        </Modal>
      </InnerContainer>
    </Container>
  );
};

export default Header;

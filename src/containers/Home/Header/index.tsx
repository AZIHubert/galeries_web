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
  const [openLogin, setOpenLogin] = React.useState<boolean>(false);
  const [openSignin, setOpenSignin] = React.useState<boolean>(false);
  const [validateResetPassword, setValidateResetPassword] = React.useState<boolean>(false);
  const [currentEmail, setCurrentEmail] = React.useState<string>('');

  const handleClickLogin = () => {
    if (!loading) {
      setOpenSignin(false);
      setOpenLogin(!openLogin);
      setError('');
    }
  };
  const handleClickSignin = () => {
    if (!loading) {
      setOpenLogin(false);
      setOpenSignin(!openSignin);
      setError('');
    }
  };
  const handleCloseModal = () => {
    if (!loading) {
      setAccountCreate(false);
      setForgotPassword(false);
      setOpenLogin(false);
      setOpenSignin(false);
      setValidateResetPassword(false);
      setCurrentEmail('');
      setError('');
    }
  };
  const switchToValidateResetPassword = () => {
    if (!loading) {
      setForgotPassword(false);
      setValidateResetPassword(true);
      setError('');
    }
  };

  const signerModal = accountCreate ? (
    <ModalVerifyAccount
      currentEmail={currentEmail}
      loading={loading}
      setError={setError}
      setLoading={setLoading}
    />
  ) : (
    <ModalSignin
      loading={loading}
      setAccountCreate={setAccountCreate}
      setCurrentEmail={setCurrentEmail}
      setError={setError}
      setLoading={setLoading}
      switchModal={handleClickLogin}
    />
  );
  const LoginModal = () => {
    if (forgotPassword) {
      return (
        <ModalForgotPassword
          setCurrentEmail={setCurrentEmail}
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
          open={openLogin || openSignin}
          handleClose={handleCloseModal}
        >
          {openLogin && LoginModal()}
          {openSignin && signerModal}
          <ModalTimer
            handleClose={() => setError('')}
            open={!!error}
            text={error}
            variant='danger'
          />
        </Modal>
      </InnerContainer>
    </Container>
  );
};

export default Header;

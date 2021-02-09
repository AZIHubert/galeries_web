import * as React from 'react';

import HeaderButton from '#components/HeaderButton';
import Modal from '#components/Modal';

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
      setAccountCreate(false);
      setForgotPassword(false);
      setOpenLogin(false);
      setOpenSignin(false);
      setValidateResetPassword(false);
      setCurrentEmail('');
    }
  };
  const switchToValidateResetPassword = () => {
    if (!loading) {
      setForgotPassword(false);
      setValidateResetPassword(true);
    }
  };

  const LoggerModal = accountCreate ? (
    <ModalVerifyAccount
      currentEmail={currentEmail}
      loading={loading}
      setLoading={setLoading}
    />
  ) : (
    <ModalSignin
      loading={loading}
      setAccountCreate={setAccountCreate}
      setCurrentEmail={setCurrentEmail}
      setLoading={setLoading}
      switchModal={handleClickLogin}
    />
  );
  const SignerModal = () => {
    if (forgotPassword) {
      return (
        <ModalForgotPassword
          setCurrentEmail={setCurrentEmail}
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
          setLoading={setLoading}
        />
      );
    }
    return (
      <ModalLogin
        loading={loading}
        setLoading={setLoading}
        setForgotPassword={setForgotPassword}
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
            data-testid='openSignin'
            marginRight={30}
            onClick={handleClickSignin}
            title='Sign in'
          />
          <HeaderButton
            data-testid='openLogin'
            onClick={handleClickLogin}
            variant='secondary'
            title='Log in'
          />
        </ButtonContainer>
        <Modal
          open={openLogin || openSignin}
          handleClose={handleCloseModal}
        >
          {openLogin && SignerModal()}
          {openSignin && LoggerModal}
        </Modal>
      </InnerContainer>
    </Container>
  );
};

export default Header;

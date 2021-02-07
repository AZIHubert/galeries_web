import * as React from 'react';
import styled from 'styled-components';

import Modal from '#components/Modal';
import logo from '#ressources/svg/logoG.svg';

import ModalForgotPassword from './ModalForgotPassword';
import ModalLogin from './ModalLogin';
import ModalSignin from './ModalSignin';
import ModalVerifyAccount from './ModalVerifyAccount';
import ModalValidateResetPassword from './ModalValidateResetPassword';

interface ButtonI {
  variant?: 'primary' | 'secondary';
  marginRight?: number;
}

const Wrapper = styled.header`
  align-items: 'center';
  background-color: #FFFFF4;
  border-bottom: 5px solid #7483FF;
  display: flex;
  justify-content: space-between;
  margin: 0 30px;
  padding: 20px 0;
`;
const Logo = styled.img`
  width: 35px;
`;
const Button = styled.button<ButtonI>`
  background-color: ${(props) => (
    props.variant === 'primary'
      ? '#7483FF'
      : '#FFFFF4'
  )};
  border: 2px solid #7483FF;
  border-radius: 6px;
  color: ${(props) => (
    props.variant === 'primary'
      ? '#FFFFF4'
      : '#7483FF'
  )};
  cursor: pointer;
  font-size: 15px;
  padding: 5px 20px;
  margin-right: ${(props) => `${props.marginRight}px`};
  transition: color .2s ease-in, background-color .3s ease-in;
  &:hover {
    background-color: ${(props) => (
    props.variant === 'primary'
      ? '#FFFFF4'
      : '#7483FF'
  )};
    color: ${(props) => (
    props.variant === 'primary'
      ? '#7483FF'
      : '#FFFFF4'
  )};
  }
  &:focus {
    outline: none;
  }
`;

Button.defaultProps = {
  variant: 'primary',
  marginRight: 0,
};

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
    <Wrapper>
      <Logo
        src={logo}
        alt="header logo"
      />
      <div>
        <Button
          data-testid='openSignin'
          marginRight={29}
          onClick={handleClickSignin}
        >
        signin
        </Button>
        <Button
          data-testid='openLogin'
          onClick={handleClickLogin}
          variant='secondary'
        >
        login
        </Button>
      </div>
      <Modal
        open={openLogin || openSignin}
        handleClose={handleCloseModal}
      >
        {openLogin && SignerModal()}
        {openSignin && LoggerModal}
      </Modal>
    </Wrapper>
  );
};

export default Header;

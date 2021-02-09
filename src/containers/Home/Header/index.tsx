import * as React from 'react';
import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';
import HeaderButton from '#components/HeaderButton';
import Modal from '#components/Modal';

import logo from '#ressources/svg/logoG.svg';

import ModalForgotPassword from './ModalForgotPassword';
import ModalLogin from './ModalLogin';
import ModalSignin from './ModalSignin';
import ModalValidateResetPassword from './ModalValidateResetPassword';
import ModalVerifyAccount from './ModalVerifyAccount';

import {
  Container,
  Logo,
} from './styles';

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: ${({ theme }) => (
    `2px solid ${theme.colors.primary}`
  )};
  height: ${({ theme }) => `${theme.header.height.small}px`};
  margin: ${({ theme }) => `0 ${theme.wrapper.margin.smallest}px`};
  @media ${mediaQueries.mobileL} {
    margin: ${({ theme }) => `0 ${theme.wrapper.margin.small}px`};
  }
  @media ${mediaQueries.laptop} {
    height: ${({ theme }) => `${theme.header.height.medium}px`};
    margin: ${({ theme }) => `0 ${theme.wrapper.margin.medium}px`};
  }
  @media ${mediaQueries.laptopL} { 
    margin: ${({ theme }) => `0 ${theme.wrapper.margin.large}px`};
    height: ${({ theme }) => `${theme.header.height.large}px`};
  }
`;
const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
`;

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

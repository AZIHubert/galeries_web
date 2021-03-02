import * as React from 'react';
import { useSelector } from 'react-redux';

import HeaderButton from '#components/HeaderButton';
import Modal from '#components/Modal';

import logo from '#ressources/svg/logoG.svg';

import { loadingSelector } from '#store/selectors';

import ModalConfirmLanding from './ModalConfirmLanding';
import ModalLogin from './ModalLogin';
import ModalResendConfirm from './ModalResendConfirm';
import ModalResetPassword from './ModalResetPassword';
import ModalResetPasswordLanding from './ModalResetPasswordLanding';
import ModalSignin from './ModalSignin';

import {
  ButtonContainer,
  Container,
  InnerContainer,
  Logo,
} from './styles';

const Header = () => {
  const loading = useSelector(loadingSelector);
  const [currentEmail, setCurrentEmail] = React.useState<string>('');
  const [currentModal, setCurrentModal] = React.useState<HeaderModals | null>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const handleClickLogin = () => {
    if (!loading) {
      setCurrentModal('login');
      setOpenModal(true);
    }
  };
  const handleClickSignin = () => {
    if (!loading) {
      setCurrentModal('signin');
      setOpenModal(true);
    }
  };
  const handleCloseModal = () => {
    if (!loading) {
      setOpenModal(false);
    }
  };
  const handleCurrentModal = () => {
    switch (currentModal) {
      case 'confirmLanding':
        return (
          <ModalConfirmLanding
            currentEmail={currentEmail}
          />
        );
      case 'login':
        return (
          <ModalLogin
            setCurrentModal={setCurrentModal}
          />
        );
      case 'resendConfirm':
        return (
          <ModalResendConfirm />
        );
      case 'resetPassword':
        return (
          <ModalResetPassword
            setCurrentEmail={setCurrentEmail}
            setCurrentModal={setCurrentModal}
          />
        );
      case 'resetPasswordLanding':
        return (
          <ModalResetPasswordLanding
            currentEmail={currentEmail}
          />
        );
      case 'signin':
        return (
          <ModalSignin
            setCurrentEmail={setCurrentEmail}
            setCurrentModal={setCurrentModal}
          />
        );
      default:
        return null;
    }
  };
  return (
    <Container>
      <InnerContainer>
        <Logo
          alt="header logo"
          src={logo}
        />
        <ButtonContainer>
          <HeaderButton
            marginRight={30}
            onClick={handleClickSignin}
            title='Sign in'
          />
          <HeaderButton
            onClick={handleClickLogin}
            title='Log in'
            variant='secondary'
          />
        </ButtonContainer>
        <Modal
          callBack={() => setCurrentModal(null)}
          handleClose={handleCloseModal}
          open={openModal}
        >
          {handleCurrentModal()}
        </Modal>
      </InnerContainer>
    </Container>
  );
};

export default Header;

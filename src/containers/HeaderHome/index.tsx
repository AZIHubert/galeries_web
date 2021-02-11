import * as React from 'react';

import HeaderButton from '#components/HeaderButton';
import Modal from '#components/Modal';
import ModalTimer from '#components/ModalTimer';

import { LoadingContext } from '#contexts/LoadingContext';

import logo from '#ressources/svg/logoG.svg';

import ModalForgotPassword from './ModalForgotPassword';
import ModalLogin from './ModalLogin';
import ModalSignin from './ModalSignin';
import ModalValidateResetPassword from './ModalValidateResetPassword';
import ModalVerifyAccount from './ModalVerifyAccount';
import ModalResendConfirm from './ModalResendConfirm';

import {
  ButtonContainer,
  Container,
  InnerContainer,
  Logo,
} from './styles';

type Modals =
  'login'
  | 'signin'
  | 'resendConfirm'
  | 'forgotPassword'
  | 'validateAccount'
  | 'validateResetPassword';

const Header = () => {
  const [errorModal, setErrorModal] = React.useState<{
    open: boolean;
    text: string;
  }>({
    open: false,
    text: '',
  });
  const [modals, setModals] = React.useState<Modals | null>(null);
  const [currentEmail, setCurrentEmail] = React.useState<string>('');
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const { loading } = React.useContext(LoadingContext);

  const handleCloseModal = () => {
    if (!loading) {
      setOpenModal(false);
      setErrorModal((prevState) => ({
        ...prevState,
        open: false,
      }));
    }
  };

  const currentModal = () => {
    switch (modals) {
      case 'forgotPassword':
        return (
          <ModalForgotPassword
            setCurrentEmail={setCurrentEmail}
            setErrorModal={setErrorModal}
            setModals={setModals}
          />
        );
      case 'login':
        return (
          <ModalLogin
            setErrorModal={setErrorModal}
            setModals={setModals}
          />
        );
      case 'signin':
        return (
          <ModalSignin
            setCurrentEmail={setCurrentEmail}
            setErrorModal={setErrorModal}
            setModals={setModals}
          />
        );
      case 'resendConfirm':
        return (
          <ModalResendConfirm
            setCurrentEmail={setCurrentEmail}
            setErrorModal={setErrorModal}
            setModals={setModals}
          />
        );
      case 'validateAccount':
        return (
          <ModalVerifyAccount
            currentEmail={currentEmail}
            setErrorModal={setErrorModal}
          />
        );
      case 'validateResetPassword':
        return (
          <ModalValidateResetPassword
            currentEmail={currentEmail}
            setErrorModal={setErrorModal}
          />
        );
      default:
        return null;
    }
  };

  const handleClickLogin = () => {
    if (!loading) {
      setOpenModal(true);
      setModals('login');
    }
  };
  const handleClickSignin = () => {
    if (!loading) {
      setOpenModal(true);
      setModals('signin');
    }
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
          callBack={() => setModals(null)}
          open={openModal}
          handleClose={handleCloseModal}
        >
          {currentModal()}
          <ModalTimer
            callBack={() => setErrorModal((prevState) => ({
              ...prevState,
              text: '',
            }))}
            handleClose={() => setErrorModal((prevState) => ({
              ...prevState,
              open: false,
            }))}
            open={errorModal.open}
            text={errorModal.text}
            variant='danger'
          />
        </Modal>
      </InnerContainer>
    </Container>
  );
};

export default Header;

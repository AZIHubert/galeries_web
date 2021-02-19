import * as React from 'react';
import { useDispatch } from 'react-redux';

import HeaderButton from '#components/HeaderButton';
import Modal from '#components/Modal';
import ModalTimer from '#components/ModalTimer';

import { LoadingContext } from '#contexts/LoadingContext';

import logo from '#ressources/svg/logoG.svg';

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

type Modals =
  'confirmLanding'
  | 'login'
  | 'resendConfirm'
  | 'resetPassword'
  | 'resetPasswordLanding'
  | 'signin';

const Header = () => {
  const [currentEmail, setCurrentEmail] = React.useState<string>('');
  const [currentModal, setCurrentModal] = React.useState<Modals | null>(null);
  const [errorModal, setErrorModal] = React.useState<{
    open: boolean;
    text: string;
  }>({
    open: false,
    text: '',
  });
  const { loading } = React.useContext(LoadingContext);
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
      setErrorModal((prevState) => ({
        ...prevState,
        open: false,
      }));
    }
  };
  const handleCurrentModal = () => {
    switch (currentModal) {
      case 'confirmLanding':
        return (
          <ModalConfirmLanding
            currentEmail={currentEmail}
            setErrorModal={setErrorModal}
          />
        );
      case 'login':
        return (
          <ModalLogin
            setCurrentModal={setCurrentModal}
            setErrorModal={setErrorModal}
            closeModal={handleCloseModal}
          />
        );
      case 'resendConfirm':
        return (
          <ModalResendConfirm
            setCurrentEmail={setCurrentEmail}
            setCurrentModal={setCurrentModal}
            setErrorModal={setErrorModal}
          />
        );
      case 'resetPassword':
        return (
          <ModalResetPassword
            setCurrentEmail={setCurrentEmail}
            setCurrentModal={setCurrentModal}
            setErrorModal={setErrorModal}
          />
        );
      case 'resetPasswordLanding':
        return (
          <ModalResetPasswordLanding
            currentEmail={currentEmail}
            setErrorModal={setErrorModal}
          />
        );
      case 'signin':
        return (
          <ModalSignin
            setCurrentEmail={setCurrentEmail}
            setCurrentModal={setCurrentModal}
            setErrorModal={setErrorModal}
          />
        );
      default:
        return null;
    }
  };
  const dispatch = useDispatch();
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
            onClick={() => dispatch({ type: '[User] Fetch' })}
            testId='openSignin'
            title='Sign in'
          />
          <HeaderButton
            onClick={handleClickLogin}
            testId='openLogin'
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

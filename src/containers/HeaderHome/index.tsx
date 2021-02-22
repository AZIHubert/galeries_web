import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import HeaderButton from '#components/HeaderButton';
import Modal from '#components/Modal';
import ModalTimer from '#components/ModalTimer';

import logo from '#ressources/svg/logoG.svg';

import { setNotification } from '#store/actions';
import {
  loadingSelector,
  notificationSelector,
} from '#store/selectors';

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
  const [currentEmail, setCurrentEmail] = React.useState<string>('');
  const [currentModal, setCurrentModal] = React.useState<HeaderModals | null>(null);
  const loading = useSelector(loadingSelector);
  const notification = useSelector(notificationSelector);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openModalTimer, setOpenModalTimer] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const handleCloseModalTimer = React.useCallback(() => setOpenModalTimer(false), []);

  React.useLayoutEffect(() => {
    if (notification.text) {
      handleCloseModalTimer();
      setOpenModalTimer(true);
    }
  }, [notification]);

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
      handleCloseModalTimer();
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
            setCurrentEmail={setCurrentEmail}
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
            callBack={() => {
              dispatch(setNotification({
                error: false,
                text: '',
              }));
            }}
            handleClose={handleCloseModalTimer}
            open={openModalTimer}
            text={notification.text}
            variant={notification.error ? 'danger' : 'primary'}
          />
        </Modal>
      </InnerContainer>
    </Container>
  );
};

export default Header;

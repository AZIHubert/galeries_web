import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import ModalContainer from '#components/ModalContainer';
import ModalTimer from '#components/ModalTimer';
import TextButton from '#components/TextButton';

import { fetchSendResetPassword } from '#store/actions';
import {
  uiSelector,
} from '#store/selectors';

interface ModalResetPasswordLandingI {
  currentEmail: string;
}

const ModalResetPasswordLanding = ({
  currentEmail,
}: ModalResetPasswordLandingI) => {
  const dispatch = useDispatch();
  const loading = useSelector(uiSelector);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const onClick = async () => {
    dispatch(fetchSendResetPassword({ email: currentEmail }));
  };
  return (
    <ModalContainer
      title='Reset your password'
      titleTextAlign='center'
    >
      <p
        data-testid='validateResetPasswordBody'
      >
        To reset your password, click the
        verification button in
        the email we sent to {currentEmail}.
        This helps keep your account secure.
      </p>
      <TextButton
        disabled={loading}
        justifyContent='center'
        onClick={onClick}
        marginBottom={30}
        marginTop={20}
        text='No email in your inbox or spam folder? Let’s'
        textButton='resend it'
      />
      <ModalTimer
        handleClose={handleClose}
        open={open}
        text='email resend'
      />
    </ModalContainer>
  );
};

export default ModalResetPasswordLanding;

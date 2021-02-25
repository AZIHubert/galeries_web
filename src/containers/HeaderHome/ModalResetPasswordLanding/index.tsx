import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import ModalContainer from '#components/ModalContainer';
import ModalTimer from '#components/ModalTimer';
import TextButton from '#components/TextButton';

import {
  fetchSendResetPassword,
  setSendResetPassword,
} from '#store/actions';
import {
  loadingSelector,
} from '#store/selectors';

interface ModalResetPasswordLandingI {
  currentEmail: string;
}

const ModalResetPasswordLanding = ({
  currentEmail,
}: ModalResetPasswordLandingI) => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => () => resetForm(), []);

  const handleClose = () => setOpen(false);
  const onClick = async () => {
    if (!loading) {
      dispatch(fetchSendResetPassword({ email: currentEmail }));
    }
  };

  const resetForm = () => {
    dispatch(setSendResetPassword({
      errors: {
        email: '',
      },
      status: 'pending',
    }));
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

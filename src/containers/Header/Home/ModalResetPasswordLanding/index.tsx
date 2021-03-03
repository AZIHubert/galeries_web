import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Button from '#components/Button';
import Modal from '#components/Modal';
import Text from '#components/Text';

import {
  fetchSendResetPassword,
  resetSendResetPassword,
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

  React.useEffect(() => () => resetForm(), []);

  const onClick = async () => {
    if (!loading) {
      resetForm();
      dispatch(fetchSendResetPassword({ email: currentEmail }));
    }
  };

  const resetForm = () => {
    dispatch(resetSendResetPassword());
  };

  return (
    <Modal.Container
      title={(
        <Text
          textAlign='center'
        >
          Reset your password
        </Text>
      )}
    >
      <p>
        To reset your password, click the
        verification button in
        the email we sent to {currentEmail}.
        This helps keep your account secure.
      </p>
      <Button.Text
        disabled={loading}
        justifyContent='center'
        onClick={onClick}
        marginBottom={30}
        marginTop={20}
        text='No email in your inbox or spam folder? Let’s'
        textButton='resend it'
      />
    </Modal.Container>
  );
};

export default ModalResetPasswordLanding;

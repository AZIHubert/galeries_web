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

import ModalTitle from './ModalTitle';

interface ModalResetPasswordLandingI {
  currentEmail: string;
}

const ModalResetPasswordLanding = ({
  currentEmail,
}: ModalResetPasswordLandingI) => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);

  React.useEffect(() => () => {
    dispatch(resetSendResetPassword());
  }, []);

  const onClick = async () => {
    if (!loading) {
      dispatch(fetchSendResetPassword({ email: currentEmail }));
    }
  };

  return (
    <Modal.Container
      title={<ModalTitle />}
    >
      <Text>
        To reset your password, click the
        verification button in
        the email we sent to {currentEmail}.
        This helps keep your account secure.
      </Text>
      <Button.Text
        disabled={loading}
        onClick={onClick}
        styles={{
          justifyContent: 'center',
          marginBottom: 30,
          marginTop: 20,
        }}
        text='No email in your inbox or spam folder? Let’s'
        textButton='resend it'
      />
    </Modal.Container>
  );
};

export default ModalResetPasswordLanding;

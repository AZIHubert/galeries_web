import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Button from '#components/Button';
import Modal from '#components/Modal';
import Text from '#components/Text';

import {
  fetchSendConfirmation,
  resetSendConfirmation,
} from '#store/actions';
import { loadingSelector } from '#store/selectors';

import ModalTitle from './ModalTitle';

interface ModalConfirmLandingI {
  currentEmail: string;
}

const ModalConfirmLanding = ({
  currentEmail,
}: ModalConfirmLandingI) => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);

  React.useEffect(() => () => {
    dispatch(resetSendConfirmation());
  }, []);

  const onClick = () => {
    if (!loading) {
      dispatch(fetchSendConfirmation({
        email: currentEmail,
      }));
    }
  };

  return (
    <Modal.Container
      title={<ModalTitle />}
    >
      <Text>
        To use Galeries, click the verification
        button in the email we sent
        to {currentEmail || '{{EMAIL_NOT_FOUND}}'}.
        This helps keep your account secure.
      </Text>
      {loading ? 'loading' : 'not loading'}
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

export default ModalConfirmLanding;

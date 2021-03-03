import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Modal from '#components/Modal';
import Button from '#components/Button';
import Text from '#components/Text';

import {
  fetchSendConfirmation,
  resetSendConfirmation,
} from '#store/actions';
import { loadingSelector } from '#store/selectors';

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
      title={<Text
        textAlign='center'
      >
          Verify your email
      </Text>}
    >
      <p>
        To use Galeries, click the verification
        button in the email we sent
        to {currentEmail}. This helps keep
        your account secure.
      </p>
      {loading ? 'loading' : 'not loading'}
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

export default ModalConfirmLanding;

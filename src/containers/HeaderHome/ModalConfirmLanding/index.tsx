import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import ModalContainer from '#components/ModalContainer';
import TextButton from '#components/TextButton';

import { fetchSendConfirmation } from '#store/actions';
import { loadingSelector } from '#store/selectors';

interface ModalConfirmLandingI {
  currentEmail: string;
}

const ModalConfirmLanding = ({
  currentEmail,
}: ModalConfirmLandingI) => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);

  const onClick = () => {
    if (!loading) {
      dispatch(fetchSendConfirmation({ email: currentEmail }));
    }
  };

  return (
    <ModalContainer
      title='Verify your email'
      titleTextAlign='center'
    >
      <p
        data-testid='verifyAccountBody'
      >
        To use Galeries, click the verification
        button in the email we sent
        to {currentEmail}. This helps keep
        your account secure.
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
    </ModalContainer>
  );
};

export default ModalConfirmLanding;

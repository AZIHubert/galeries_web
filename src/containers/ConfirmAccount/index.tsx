import * as React from 'react';
import {
  useParams,
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';

import { confirmation } from '#helpers/api';

import logo from '#ressources/svg/logoG.svg';

interface ConfirmAccountI {
  setCallbackModal: React.Dispatch<React.SetStateAction<string>>;
  setCallbackModalError: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
  
`;

const Image = styled.img`
  width: 200px;
`;

const ConfirmAccount = ({
  setCallbackModal,
  setCallbackModalError,
}: ConfirmAccountI) => {
  const { token } = useParams<{ token: string }>();
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [redirect, setRedirect] = React.useState<boolean>(false);
  const [requestFinish, setRequestFinish] = React.useState<boolean>(false);
  const history = useHistory();
  React.useEffect(() => {
    timer.current = setTimeout(() => setRedirect(true), 1500);
    const confimAccount = async () => {
      try {
        await confirmation(`Bearer ${token}`);
        setCallbackModal('you\'re account has been successfully confirm, you can now log in to enjoy Galleries');
      } catch (err) {
        const { errors } = err.response.data;
        setCallbackModal(errors);
        setCallbackModalError(true);
      }
      setRequestFinish(true);
    };
    confimAccount();
  }, []);
  React.useEffect(() => {
    if (redirect && requestFinish) {
      history.push('/');
    }
  }, [redirect, requestFinish]);
  return (
    <Container>
      <Image
        alt='Galeries logo'
        src={logo}
      />
    </Container>
  );
};

export default ConfirmAccount;

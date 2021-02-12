import * as React from 'react';
import {
  useHistory,
  useParams,
} from 'react-router-dom';

import Loader from '#components/Loader';

import { confirmation } from '#helpers/api';

interface ConfirmAccountI {
  setCallbackModal: React.Dispatch<React.SetStateAction<{
    error: boolean;
    open: boolean;
    text: string;
  }>>
}

const ConfirmAccount = ({
  setCallbackModal,
}: ConfirmAccountI) => {
  const [allowRedirect, setAllowRedirect] = React.useState<boolean>(false);
  const history = useHistory();
  const [requestFinish, setRequestFinish] = React.useState<boolean>(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const { token } = useParams<{ token: string }>();
  React.useEffect(() => {
    timer.current = setTimeout(() => setAllowRedirect(true), 1500);
    const confimAccount = async () => {
      try {
        await confirmation(`Bearer ${token}`);
        setCallbackModal((prevState) => ({
          ...prevState,
          text: 'you\'re account has been successfully confirm, you can now log in to enjoy Galleries.',
        }));
      } catch (err) {
        const { errors } = err.response.data;
        setCallbackModal((prevState) => ({
          ...prevState,
          error: true,
          text: errors,
        }));
      }
      setRequestFinish(true);
    };
    confimAccount();
  }, []);
  React.useEffect(() => {
    if (allowRedirect && requestFinish) {
      history.push('/');
    }
  }, [allowRedirect, requestFinish]);
  return (
    <Loader />
  );
};

export default ConfirmAccount;

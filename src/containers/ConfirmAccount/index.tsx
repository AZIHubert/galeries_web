import * as React from 'react';
import {
  useParams,
  useHistory,
} from 'react-router-dom';

import Loader from '#components/Loader';

import { confirmation } from '#helpers/api';

interface ConfirmAccountI {
  setCallbackModal: React.Dispatch<React.SetStateAction<{
    open: boolean;
    error: boolean;
    text: string;
  }>>
}

const ConfirmAccount = ({
  setCallbackModal,
}: ConfirmAccountI) => {
  const [allowRedirect, setAllowRedirect] = React.useState<boolean>(false);
  const history = useHistory();
  const [requestFinish, setRequestFinish] = React.useState<boolean>(false);
  const { token } = useParams<{ token: string }>();
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
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

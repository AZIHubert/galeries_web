import * as React from 'react';
import {
  useHistory,
  useParams,
} from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Loader from '#components/Loader';

import { fetchConfirmation } from '#store/actions';
import { uiSelector } from '#store/selectors';

const ConfirmAccount = () => {
  const [allowRedirect, setAllowRedirect] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(uiSelector);
  const { token } = useParams<{ token: string }>();

  React.useEffect(() => {
    const timer = setTimeout(() => setAllowRedirect(true), 1500);
    dispatch(fetchConfirmation(`Bearer ${token}`));
    return () => clearInterval(timer);
  }, []);
  React.useEffect(() => {
    if (allowRedirect && loading) {
      history.push('/');
    }
  }, [allowRedirect, loading]);
  return (
    <Loader />
  );
};

export default ConfirmAccount;

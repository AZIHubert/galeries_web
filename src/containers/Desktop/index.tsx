import * as React from 'react';

import Loader from '#components/Loader';

import Header from '#containers/Header';

import { UserContext } from '#contexts/UserContext';

import { getMe } from '#helpers/api';
import verifyTokens from '#helpers/verifyTokens';

const Desktop = () => {
  const [allowRedirect, setAllowRedirect] = React.useState<boolean>(false);
  const [requestFinish, setRequestFinish] = React.useState<boolean>(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const { setUser } = React.useContext(UserContext);
  React.useEffect(() => {
    timer.current = setTimeout(() => setAllowRedirect(true), 1500);
    const handleMe = async () => {
      try {
        await verifyTokens();
        const response = await getMe();
        setUser(response.data);
        setRequestFinish(true);
      } catch (err) {
        console.log(err.response);
      }
    };
    handleMe();
  }, []);
  if (allowRedirect && requestFinish) {
    return (
      <div>
        <Header />
      </div>
    );
  }
  return (
    <Loader />
  );
};

export default Desktop;

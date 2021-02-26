import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import ModalTimer from '#components/ModalTimer';

import {
  setNotification,
} from '#store/actions';
import {
  notificationSelector,
} from '#store/selectors';

const Notification = () => {
  const dispatch = useDispatch();
  const [openModalTimer, setOpenModalTimer] = React.useState<boolean>(false);
  const notification = useSelector(notificationSelector);
  const handleCloseModalTimer = React.useCallback(() => setOpenModalTimer(false), []);

  React.useLayoutEffect(() => {
    if (notification.text) {
      handleCloseModalTimer();
      setOpenModalTimer(true);
    }
  }, [notification]);

  return (
    <ModalTimer
      callBack={() => {
        dispatch(setNotification({
          error: false,
          text: '',
        }));
      }}
      handleClose={handleCloseModalTimer}
      open={openModalTimer}
      text={notification.text}
      variant={notification.error ? 'danger' : 'primary'}
    />
  );
};

export default Notification;

import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Modal from '#components/Modal';

import { resetNotification } from '#store/actions';
import { notificationSelector } from '#store/selectors';

const Notification = () => {
  const dispatch = useDispatch();
  const handleCloseModalTimer = React.useCallback(() => setOpenModalTimer(false), []);
  const notification = useSelector(notificationSelector);
  const [openModalTimer, setOpenModalTimer] = React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    if (notification.text) {
      handleCloseModalTimer();
      setOpenModalTimer(true);
    }
  }, [notification]);

  return (
    <Modal.Timer
      callBack={() => {
        dispatch(resetNotification());
      }}
      handleClose={handleCloseModalTimer}
      open={openModalTimer}
      testId='modal'
      text={notification.text}
      variant={notification.error ? 'danger' : 'primary'}
    />
  );
};

export default Notification;

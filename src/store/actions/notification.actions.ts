import { USER } from '#store/actions';

export const SET_NOTIFICATION = 'SET_NOTIFICATION';

type Entity = typeof USER;

export const setNotification = (
  notification: string,
  entity: Entity,
) => ({
  type: `${entity} ${SET_NOTIFICATION}`,
  payload: {
    data: notification,
    meta: entity,
  },
});

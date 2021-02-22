import { USER_SET } from '#store/actions';

const initialState = null;

export default (
  user: UserI | null = initialState,
  action: store.ActionI,
) => {
  const {
    payload,
    type,
  } = action;
  switch (type) {
    case USER_SET:
      return payload.data;
    default:
      return user;
  }
};

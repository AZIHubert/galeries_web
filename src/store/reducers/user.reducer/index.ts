import { USER_SET } from '#store/actions';

const initialState = null;

export default (
  user: UserI | null = initialState,
  action: store.ActionI,
) => {
  const {
    payload: { data },
    type,
  } = action;
  switch (type) {
    case USER_SET:
      return data;
    default:
      return user;
  }
};

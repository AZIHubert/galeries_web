import { USER_SET } from '#store/actions';

const initialState: UserI | null = null;

export default (
  state = initialState,
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
      return state;
  }
};

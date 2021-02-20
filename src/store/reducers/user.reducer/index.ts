import { SET_USER } from '#store/actions';

const initialState = null;

export default (
  user: UserI | null = initialState,
  action: store.ActionI,
) => {
  const { payload } = action;
  switch (action.type) {
    case SET_USER:
      return payload.data;
    default:
      return user;
  }
};

import { SET_USER } from '../actions';

const initialState = null;

export default (
  user: UserI | null = initialState,
  action: ActionUserI,
) => {
  const { payload } = action;
  switch (action.type) {
    case SET_USER:
      return payload.data;
    default:
      return user;
  }
};

import { USER_SET } from '#store/actions';

const initialState: UserI | null = null;

export default (
  state = initialState,
  action: store.ActionI,
) => {
  switch (action.type) {
    case USER_SET:
      return action.payload ? action.payload.data : undefined;
    default:
      return state;
  }
};

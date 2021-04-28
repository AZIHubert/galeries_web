export const GALERIE_USERS = '[GALERIE_USERS]';

export const GALERIE_USERS_FETCH = `${GALERIE_USERS} Fetch`;
export const GALERIE_USERS_SET = `${GALERIE_USERS} Set`;

export const fetchGalerieUsers: (
  data: {
    id: string
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: GALERIE_USERS_FETCH,
});

export const setGalerieUsers: (
  data: {
    id: string;
    users: UserI[];
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: GALERIE_USERS_SET,
});

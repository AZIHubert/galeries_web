export const PSEUDONYM = '[PSEUDONYM]';

export const PSEUDONYM_PUT = `${PSEUDONYM} Put`;
export const PSEUDONYM_SET = `${PSEUDONYM} Set`;

export const putPseudonym: (
  data: form.PseudonymI
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: PSEUDONYM_PUT,
});

export const resetPseudonym: () => store.ActionI = () => ({
  payload: {
    data: {
      errors: {
        pseudonym: '',
      },
      status: 'pending',
    },
  },
  type: PSEUDONYM_SET,
});

export const setPseudonym: (
  data: {
    errors?: form.PseudonymI;
    status?: store.Status;
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: PSEUDONYM_SET,
});

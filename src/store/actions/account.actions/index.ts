export const ACCOUNT = '[ACCOUNT]';

export const ACCOUNT_DELETE = `${ACCOUNT} Delete`;
export const ACCOUNT_SET = `${ACCOUNT} Set`;

export const deleteAccount: (
  data: form.AccountI
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: ACCOUNT_DELETE,
});

export const resetAccount: () => store.ActionI = () => ({
  payload: {
    data: {
      errors: {
        deleteAccountSentence: '',
        password: '',
        userNameOrEmail: '',
      },
      status: 'pending',
    },
  },
  type: ACCOUNT_SET,
});

export const setAccount: (
  data: {
    errors?: form.AccountI;
    status?: store.Status;
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: ACCOUNT_SET,
});

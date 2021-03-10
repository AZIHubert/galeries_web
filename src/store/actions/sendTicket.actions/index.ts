export const SEND_TICKET = '[SEND TICKET]';

export const SEND_TICKET_FETCH = `${SEND_TICKET} Fetch`;
export const SEND_TICKET_SET = `${SEND_TICKET} Set`;

export const fetchSendTicket: (
  data: form.SendTicketI
) => store.ActionI = (
  data: form.SendTicketI,
) => ({
  payload: { data },
  type: SEND_TICKET_FETCH,
});

export const resetSendTicket: () => store.ActionI = () => ({
  payload: {
    data: {
      errors: {
        body: '',
        header: '',
      },
      status: 'pending',
    },
  },
  type: SEND_TICKET_SET,
});

export const setSendTicket: (
  data: {
    errors?: form.SendTicketI;
    status?: store.Status;
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: SEND_TICKET_SET,
});

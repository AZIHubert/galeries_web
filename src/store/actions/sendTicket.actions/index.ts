export const SEND_TICKET = '[SEND TICKET]';

export const SEND_TICKET_FETCH = `${SEND_TICKET} fetch`;
export const SEND_TICKET_SET = `${SEND_TICKET} set`;

interface DataSetI {
  status?: store.FormStatus;
  errors?: SendTicketI;
}

export const setSendTicket: (
  data: DataSetI
) => store.ActionI = (
  data,
) => ({
  type: SEND_TICKET_SET,
  payload: {
    data,
  },
});

export const fetchSendTicket: (
  data: SendTicketI
) => store.ActionI = (
  data: SendTicketI,
) => ({
  type: SEND_TICKET_FETCH,
  payload: {
    data,
  },
});

import moment from 'moment';

import { localStorages } from '#store/constant';

export default (token: string) => {
  localStorage.setItem(
    localStorages.EXPIRES_DATE_TOKEN,
    JSON.stringify(moment().add(token, 's').valueOf()),
  );
};

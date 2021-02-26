import { localStorages } from '#store/constant';

export default () => localStorage.getItem(localStorages.EXPIRES_DATE_TOKEN);

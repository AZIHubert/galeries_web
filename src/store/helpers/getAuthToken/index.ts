import { localStorages } from '#store/constant';

export default () => localStorage.getItem(localStorages.AUTH_TOKEN);

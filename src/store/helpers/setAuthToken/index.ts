import { localStorages } from '#store/constant';

export default (token: string) => {
  localStorage.setItem(
    localStorages.AUTH_TOKEN,
    token,
  );
};

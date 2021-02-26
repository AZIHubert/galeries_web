import { USER_SET } from '#store/actions';

import reducer from '../index';

describe('user', () => {
  describe('reducer', () => {
    it('should set default state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toBeNull();
    });
    it('should set user', () => {
      const user: UserI = {
        createdAt: new Date(),
        currentProfilePicture: null,
        currentProfilePictureId: null,
        defaultProfilePicture: null,
        email: null,
        facebookId: null,
        googleId: null,
        id: 'id',
        role: 'user',
        updatedAt: null,
        userName: 'userName',
      };
      expect(reducer(undefined, {
        payload: {
          data: user,
        },
        type: USER_SET,
      })).toEqual(user);
    });
  });
});

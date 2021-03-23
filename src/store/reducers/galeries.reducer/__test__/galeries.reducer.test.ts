import {
  GALERIES_SET,
} from '#store/actions';

import reducer from '../index';

describe('profilePictures', () => {
  describe('reducer', () => {
    const defaultValue = {
      end: false,
      page: 0,
      galeries: {},
      status: 'pending',
    };
    it('should return the initial state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toEqual(defaultValue);
    });
    it('should set galeries status', () => {
      const data = {
        status: 'success',
      };
      expect(reducer(undefined, {
        payload: {
          data,
        },
        type: GALERIES_SET,
      })).toEqual({
        ...defaultValue,
        ...data,
      });
    });
    it('should set galeries', () => {
      const galeries: { [name: string]: GalerieI } = {
        0: {
          id: '1',
          name: 'galerie name',
          users: [
            {
              createdAt: new Date(),
              currentProfilePicture: null,
              currentProfilePictureId: null,
              defaultProfilePicture: null,
              email: 'user@email.com',
              facebookId: null,
              googleId: null,
              id: '1',
              pseudonym: 'pseudonym',
              role: 'admin',
              updatedAt: new Date(),
              userName: '@userName',
            },
          ],
        },
      };
      expect(reducer(undefined, {
        payload: {
          data: {
            galeries,
          },
        },
        type: GALERIES_SET,
      })).toEqual({
        ...defaultValue,
        galeries,
      });
    });
  });
});

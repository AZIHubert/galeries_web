import {
  PROFILE_PICTURES_SET,
} from '#store/actions';

import reducer from '../index';

describe('profilePictures', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toEqual({
        status: 'pending',
        profilePictures: [],
      });
    });
    it('should set profilePictures status', () => {
      const data = {
        status: 'success',
        profilePictures: [],
      };
      expect(reducer(undefined, {
        payload: {
          data,
        },
        type: PROFILE_PICTURES_SET,
      })).toEqual(data);
    });
    it('should set current profilePicture', () => {
      const profilePictures: ProfilePictureI[] = [
        {
          createdAt: new Date(),
          cropedImage: {
            bucketName: 'bucketName',
            fileName: 'fileName',
            format: 'jpeg',
            height: 1,
            id: 'id',
            signedUrl: 'signedUrl',
            size: 1,
            width: 1,
          },
          id: 'id',
          originalImage: {
            bucketName: 'bucketName',
            fileName: 'fileName',
            format: 'jpeg',
            height: 1,
            id: 'id',
            signedUrl: 'signedUrl',
            size: 1,
            width: 1,
          },
          pendingImage: {
            bucketName: 'bucketName',
            fileName: 'fileName',
            format: 'jpeg',
            height: 1,
            id: 'id',
            signedUrl: 'signedUrl',
            size: 1,
            width: 1,
          },
        },
      ];
      expect(reducer(undefined, {
        payload: {
          data: {
            profilePictures,
          },
        },
        type: PROFILE_PICTURES_SET,
      })).toEqual({
        status: 'pending',
        profilePictures,
      });
    });
  });
});

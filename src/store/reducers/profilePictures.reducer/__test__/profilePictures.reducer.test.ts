import {
  PROFILE_PICTURES_SET,
} from '#store/actions';

import reducer from '../index';

describe('profilePictures', () => {
  describe('reducer', () => {
    const defaultValue = {
      end: false,
      page: 0,
      profilePictures: {},
      status: 'pending',
    };
    it('should return the initial state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toEqual(defaultValue);
    });
    it('should set profilePictures status', () => {
      const data = {
        profilePictures: [],
        status: 'success',
      };
      expect(reducer(undefined, {
        payload: {
          data,
        },
        type: PROFILE_PICTURES_SET,
      })).toEqual({
        ...defaultValue,
        ...data,
      });
    });
    it('should set current profilePicture', () => {
      const profilePictures: { [name: string]: ProfilePictureI } = {
        0: {
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
      };
      expect(reducer(undefined, {
        payload: {
          data: {
            profilePictures,
          },
        },
        type: PROFILE_PICTURES_SET,
      })).toEqual({
        ...defaultValue,
        profilePictures,
      });
    });
  });
});

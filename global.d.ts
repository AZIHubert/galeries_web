import '@testing-library/jest-dom';
import {
  Method,
} from 'axios';

import {
  USER,
  REFRESH_TOKEN,
} from '#store/actions';

declare global {

  namespace store {
    type Entity = typeof USER | typeof REFRESH_TOKEN;
    interface ActionI {
      type: string;
      payload: {
        data: any;
        meta?: {
          entity?: Entity;
          method?: Method;
          url?: string;
          confirmToken?: string;
        }
      }
    }
  }

  interface ImageI {
    bucketName: string;
    fileName: string;
    format: string;
    height: number;
    id: string;
    signedUrl: string;
    size: number;
    width: number;
  }

  interface ProfilePictureI {
    createdAt: Date;
    cropedImage: ImageI;
    id: string;
    originalImage: ImageI;
    pendingImage: ImageI
  }

  interface UserI {
    createdAt: Date;
    currentProfilePicture: ProfilePictureI | null;
    currentProfilePictureId: string | null;
    defaultProfilePicture: string | null;
    email: string | null;
    facebookId: string | null;
    googleId: string | null;
    id: string;
    profilePictures: ProfilePictureI[];
    role: string;
    updatedAt: string | null;
    userName: string;
  }
}

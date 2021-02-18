import '@testing-library/jest-dom';
import {
  AxiosError,
  AxiosResponse,
} from 'axios';

declare global {

  type Entity = '[User]' | '[Notification]';

  interface ActionApiI {
    type: string;
    payload: {
      data: any,
      meta: {
        method: string;
        url: string;
        entity: Entity;
      }
    }
  }

  interface ActionUiI {
    type: string;
    payload: {
      data: boolean;
      meta?: {
        entity: Entity;
      }
    };
  }

  interface ActionUserI {
    type: string;
    payload: {
      data: AxiosError | AxiosResponse;
      meta?: {
        entity: Entity;
      }
    }
  }

  interface ActionNotificationI {
    type: string;
    payload: {
      text: string;
      error: boolean;
      meta?: {
        entity: Entity;
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

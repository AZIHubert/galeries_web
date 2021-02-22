import '@testing-library/jest-dom';
import {
  Method,
} from 'axios';

import {
  CONFIRMATION,
  LOGIN,
  LOGIN_FACEBOOK,
  LOGIN_GOOGLE,
  LOGOUT,
  REFRESH_TOKEN,
  RESET_PASSWORD,
  SEND_CONFIRMATION,
  SEND_RESET_PASSWORD,
  SIGNIN,
  USER,
} from '#store/actions';

declare global {

  namespace store {
    type Entity =
      typeof CONFIRMATION |
      typeof LOGIN |
      typeof LOGIN_FACEBOOK |
      typeof LOGIN_GOOGLE |
      typeof LOGOUT |
      typeof REFRESH_TOKEN |
      typeof RESET_PASSWORD |
      typeof SEND_CONFIRMATION |
      typeof SEND_RESET_PASSWORD |
      typeof SIGNIN |
      typeof USER;
    type FormStatus = 'pending' | 'success' | 'error';
    interface ActionI {
      type: string;
      payload: {
        data: any;
        meta?: {
          entity?: Entity;
          method?: Method;
          url?: string;
          confirmToken?: string;
          callback?: () => void;
        }
      }
    }
    interface ReducersI {
      login: {
        status: FormStatus;
        errors: LoginI;
      };
      notification: NotificationI;
      resetPassword: ResetPasswordI;
      sendConfirmation: {
        status: FormData;
        errors: SendConfirmationI;
      };
      sendResetPassword: { errors: SendResetPasswordI };
      signin: {
        status: FormStatus;
        errors: SigninI;
      };
      ui: { loading: boolean; };
      user: UserI | null;
    }
  }

  type HeaderModals =
  'confirmLanding'
  | 'login'
  | 'resendConfirm'
  | 'resetPassword'
  | 'resetPasswordLanding'
  | 'signin';

  interface SendResetPasswordI {
    email: string;
  }
  interface SendConfirmationI {
    email: string;
  }

  interface ResetPasswordI {
    confirmPassword: string;
    password: string;
  }

  interface NotificationI {
    text: string;
    error: boolean;
  }
  interface LoginI {
    password: string;
    userNameOrEmail: string;
  }
  interface SigninI {
    confirmPassword: string;
    email: string;
    password: string;
    userName: string;
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
    role: string;
    updatedAt: string | null;
    userName: string;
  }
}

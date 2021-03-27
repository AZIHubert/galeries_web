import '@testing-library/jest-dom';
import {
  Method,
} from 'axios';

import {
  CONFIRMATION,
  LOGIN,
  LOGIN_FACEBOOK,
  LOGIN_GOOGLE,
  LOGIN_SET,
  LOGOUT,
  PROFILE_PICTURE_POST,
  PROFILE_PICTURE_SET,
  PROFILE_PICTURES,
  REFRESH_TOKEN,
  RESET_PASSWORD,
  SEND_CONFIRMATION,
  SEND_RESET_PASSWORD,
  SEND_TICKET,
  SIGNIN,
  USER_SET,
} from '#store/actions';

declare global {
  namespace form {
    interface AccountI {
      deleteAccountSentence: string;
      password: string;
      userNameOrEmail: string;
    }
    interface ChangeEmailI {
      password: string;
    }
    interface ChangeEmailConfirmI {
      password: string;
      email: string;
    }
    interface LoginI {
      password: string;
      userNameOrEmail: string;
    }
    interface PseudonymI {
      pseudonym: string;
    }
    interface ResetPasswordI {
      confirmPassword: string;
      password: string;
    }
    interface SendConfirmationI {
      email: string;
    }
    interface SendResetPasswordI {
      email: string;
    }
    interface SendTicketI {
      body: string;
      header: string;
    }
    interface SigninI {
      confirmPassword: string;
      email: string;
      password: string;
      userName: string;
    }
    interface UpdateEmailI {
      password: string;
    }
    interface UpdatePasswordI {
      confirmNewPassword: string;
      currentPassword: string;
      newPassword: string;
    }
  }
  namespace store {
    type Entity =
      typeof CONFIRMATION |
      typeof LOGIN |
      typeof LOGIN_FACEBOOK |
      typeof LOGIN_GOOGLE |
      typeof LOGIN_SET |
      typeof LOGOUT |
      typeof PROFILE_PICTURES |
      typeof PROFILE_PICTURE_POST |
      typeof PROFILE_PICTURE_SET |
      typeof REFRESH_TOKEN |
      typeof RESET_PASSWORD |
      typeof SEND_CONFIRMATION |
      typeof SEND_RESET_PASSWORD |
      typeof SEND_TICKET |
      typeof SIGNIN |
      typeof USER_SET;

    type Status =
      'delete' |
      'error' |
      'fetching' |
      'pending' |
      'posting' |
      'putting' |
      'success';

    interface ActionI {
      type: string;
      payload?: {
        data: any;
        meta?: {
          confirmToken?: string;
          contentType?: string;
          entity?: Entity;
          method?: Method;
          page?: number;
          url?: string;
          params?: string;
        }
      }
    }

    interface NotificationI {
      text: string;
      error: boolean;
    }

    interface ReducersI {
      account: {
        errors: form.AccountI;
        status: Status;
      }
      frame: {
        status: Status;
      }
      galerie: {
        status: Status;
        errors: {
          name: string;
        }
      }
      galeries: {
        end: boolean;
        page: number;
        galeries: { [name: string]: GalerieI };
        status: Status;
      }
      login: {
        status: Status;
        errors: form.LoginI;
      };
      notification: NotificationI;
      profilePicture: {
        status: Status;
        current: {
          croped: string;
          original: string;
          pending: string;
        }
      };
      profilePictures: {
        end: boolean;
        page: number;
        profilePictures: { [name: string]: ProfilePictureI };
        status: Status;
      }
      pseudonym: {
        errors: form.PseudonymI;
        status: Status;
      }
      resetPassword: {
        errors: form.ResetPasswordI
        status: Status;
      };
      sendConfirmation: {
        errors: form.SendConfirmationI;
        status: Status;
      };
      sendResetPassword: {
        errors: form.SendResetPasswordI;
        status: Status;
      };
      sendTicket: {
        errors: form.SendTicketI;
        status: Status;
      }
      signin: {
        errors: SigninI;
        status: Status;
      };
      ui: {
        init: boolean;
        loading: boolean;
      };
      updateEmail: {
        errors: form.ChangeEmailI;
        status: Status;
      }
      updateEmailConfirm: {
        errors: form.ChangeEmailConfirmI;
        status: Status;
      }
      updateEmailValidate: {
        errors: form.UpdateEmailI;
        status: Status;
      }
      updatePassword: {
        errors: form.UpdatePasswordI;
        status: Status;
      }
      user: UserI | null;
    }
  }

  namespace style {
    type Color =
      'black' |
      'danger' |
      'primary' |
      'secondary' |
      'tertiary' |
      'white';
    type FontStyle =
      'italic' |
      'normal';
    type FontWeight =
      'bold' |
      'lighter' |
      'normal';
    type JustifyContent =
      'center' |
      'end' |
      'flex-end' |
      'flex-start' |
      'normal' |
      'right' |
      'safe' |
      'space-around' |
      'space-evenly' |
      'start' |
      'stretch' |
      'unsafe';
    type TextAlign =
      'center' |
      'end' |
      'justify' |
      'justify-all' |
      'left' |
      'match-parent' |
      'right' |
      'start';
  }

  type HeaderModals =
    'confirmLanding'
    | 'login'
    | 'resendConfirm'
    | 'resetPassword'
    | 'resetPasswordLanding'
    | 'signin';

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

  interface FrameI {
    id: string;
    galerieId: string;
    createdAt: Date;
    updatedAt: Date;
    galeriePictures: {
      id: string;
      index: number;
      cropedImage: ImageI;
      originalImage: ImageI;
      pendingImage: ImageI;
    }
  }

  interface ProfilePictureI {
    createdAt: Date;
    cropedImage: ImageI;
    id: string;
    originalImage: ImageI;
    pendingImage: ImageI
  }

  interface GalerieI {
    id: string;
    name: string;
    defaultCoverPicture: string;
    archived?: boolean;
    users: UserI[];
    frames: {
      frames: { [name: string]: FramesI };
      end: boolean;
      page: number;
      status: Status;
    };
    createdAt: Date;
    updatedAt: Date;
    role: 'user' | 'admin' | 'creator';
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
    pseudonym: string;
    role: string;
    updatedAt: Date | null;
    userName: string;
  }
}

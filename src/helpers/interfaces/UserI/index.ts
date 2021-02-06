import ProfilePictureI from '../ProfilePictureI';

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

export default UserI;

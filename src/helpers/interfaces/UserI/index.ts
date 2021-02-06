import ProfilePictureI from '../ProfilePictureI';

interface UserI {
  createdAt: Date;
  currentProfilePicture: null | ProfilePictureI;
  currentProfilePictureId: string | null;
  defaultProfilePicture: string | null;
  email: string | null;
  facebookId: string | null;
  googleId: string | null;
  id: string;
  profilePictures: ProfilePictureI[];
  role: string;
  updatedAt: string;
  userName: string;
}

export default UserI;

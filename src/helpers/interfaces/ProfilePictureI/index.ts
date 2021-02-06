import ImageI from '../ImageI';

interface ProfilePictureI {
  createdAt: Date;
  cropedImage: ImageI;
  id: string;
  originalImage: ImageI;
  pendingImage: ImageI
}

export default ProfilePictureI;

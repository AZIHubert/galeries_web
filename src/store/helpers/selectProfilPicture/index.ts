import defaultProfilePicture from '#ressources/svg/defaultProfilePicture.svg';

const profilePicture: (
  user: UserI | null
) => {
  croped: string;
  original?: string;
  pending?: string;
} = (
  user: UserI | null,
) => {
  if (user) {
    if (user.currentProfilePicture) {
      return {
        croped: user.currentProfilePicture.cropedImage.signedUrl,
        original: user.currentProfilePicture.originalImage.signedUrl,
        pending: user.currentProfilePicture.pendingImage.signedUrl,
      };
    }
    if (user.defaultProfilePicture) {
      return {
        croped: user.defaultProfilePicture,
      };
    }
  }
  return {
    croped: defaultProfilePicture,
  };
};

export default profilePicture;

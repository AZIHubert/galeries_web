import defaultProfilePicture from '#ressources/svg/defaultProfilePicture.svg';

const profilePicture: (
  user: UserI | null
) => {
  croped: string;
  pending: string;
} = (
  user: UserI | null,
) => {
  if (user) {
    if (user.currentProfilePicture) {
      return {
        croped: user.currentProfilePicture.cropedImage.signedUrl,
        pending: user.currentProfilePicture.pendingImage.signedUrl,
      };
    }
    if (user.defaultProfilePicture) {
      return {
        croped: user.defaultProfilePicture,
        pending: user.defaultProfilePicture,
      };
    }
  }
  return {
    croped: defaultProfilePicture,
    pending: defaultProfilePicture,
  };
};

export default profilePicture;

import defaultProfilePicture from '#ressources/svg/defaultProfilePicture.svg';

const profilePicture: (
  user: UserI | null
) => any = (
  user: UserI | null,
) => {
  if (user) {
    if (user.currentProfilePicture) return user.currentProfilePicture.cropedImage.signedUrl;
    if (user.defaultProfilePicture) return user.defaultProfilePicture;
  }
  return defaultProfilePicture;
};

export default profilePicture;

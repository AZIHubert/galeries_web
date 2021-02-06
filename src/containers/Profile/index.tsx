import * as React from 'react';

import { ProfilePictureI, UserI } from '#helpers/interfaces';

import ProfilePictureContainer from './ProfilePictureContainer';

const profilePicture: (user: UserI) => any = (user: UserI) => {
  if (user.currentProfilePicture) {
    return user.currentProfilePicture.cropedImage.signedUrl;
  }
  if (user.defaultProfilePicture) {
    return user.defaultProfilePicture;
  }
  return '#ressources/images/defaultProfilePicture.png';
};

interface ProfileI {
  switchCurrent: (pp: ProfilePictureI) => void;
  addProfilePicture: (pp: File) => void;
  user: UserI;
}

const Profile = ({
  addProfilePicture,
  switchCurrent,
  user,
}: ProfileI) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    if (selectedFile) {
      addProfilePicture(selectedFile);
    }
  }, [selectedFile]);
  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const inputClick = () => {
    if (fileInputRef.current) { fileInputRef.current.click(); }
  };
  return (
    <div>
      <img
        data-testid='currentProfilePicture'
        src={profilePicture(user)}
        alt='current profile picture'
      />
      <p
        data-testid='userNameText'
      >
        {user.userName}
      </p>
      <input
        accept="image/*"
        data-testid='inputFile'
        onChange={addFile}
        ref={fileInputRef}
        type="file"
      />
      <button
        data-testid="addProfilePictureButton"
        onClick={inputClick}
      >
        Add a profile picture
      </button>
      <button>
        Edit your info
      </button>
      <ProfilePictureContainer
        currentProfileId={user.currentProfilePictureId}
        profilePictures={user.profilePictures}
        switchCurrent={switchCurrent}
      />
    </div>
  );
};

export default Profile;

import * as React from 'react';

import { UserContext } from '#contexts/UserContext';

import {
  ImageI,
  ProfilePictureI,
  UserI,
} from '#helpers/interfaces';

import ProfilePictureContainer from './ProfilePictureContainer';

const profilePicture
: (user: UserI | null) => any = (user: UserI | null) => {
  if (user && user.currentProfilePicture) {
    return user.currentProfilePicture.cropedImage.signedUrl;
  }
  if (user && user.defaultProfilePicture) {
    return user.defaultProfilePicture;
  }
  return '#ressources/images/defaultProfilePicture.png';
};

const Profile = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const { setUser, user } = React.useContext(UserContext);
  React.useEffect(() => {
    if (selectedFile) {
      const newImage: ImageI = {
        bucketName: 'bucketName',
        fileName: selectedFile.name,
        format: 'jpg',
        height: 2340,
        id: '2',
        signedUrl: 'http://newprofilepicture.com/',
        size: 100857,
        width: 1080,
      };
      const newProfilePicture: ProfilePictureI = {
        createdAt: new Date(),
        cropedImage: newImage,
        id: '2',
        originalImage: newImage,
        pendingImage: newImage,
      };
      setUser((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            currentProfilePictureId: newProfilePicture.id,
            currentProfilePicture: newProfilePicture,
            profilePictures: [
              newProfilePicture,
              ...prevState.profilePictures,
            ],
          };
        }
        return null;
      });
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
        {user ? user.userName : 'user name'}
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
      <ProfilePictureContainer />
    </div>
  );
};

export default Profile;

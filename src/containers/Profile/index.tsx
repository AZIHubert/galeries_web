import * as React from 'react';
import {
  useSelector,
} from 'react-redux';

import { userSelector } from '#store/selectors';

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
  const user = useSelector(userSelector);
  React.useEffect(() => {
    if (selectedFile) {
      // selectedFile
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

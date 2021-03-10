import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Button from '#components/Button';
import Text from '#components/Text';

import { ProfilePictureContext } from '#contexts/ProfilePictureContext';

import { postProfilePicture } from '#store/actions';
import { userSelector } from '#store/selectors';

import {
  Container,
  FileInput,
} from './styles';

const Information = () => {
  const {
    isPosting,
  } = React.useContext(ProfilePictureContext);
  const dispatch = useDispatch();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const user = useSelector(userSelector);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (selectedFile) {
      if (!isPosting) {
        const formData = new FormData();
        formData.append('image', selectedFile, selectedFile.name);
        dispatch(postProfilePicture(formData));
      }
      setSelectedFile(null);
    }
  }, [
    selectedFile,
    isPosting,
  ]);

  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement;
    if (element.files) {
      setSelectedFile(element.files[0]);
      element.value = '';
    }
  };
  const handleClick = () => {
    if (fileInputRef.current && !isPosting) {
      fileInputRef.current.click();
    }
  };

  return (
    <Container>
      <Text
        color='primary'
        fontWeight='bold'
        styles={{
          fontSize: 1.8,
          marginTop: 20,
          textAlign: 'center',
        }}
        stylesMobile={{
          fontSize: 2,
        }}
        stylesTablet={{
          fontSize: 2.4,
          marginTop: 0,
          textAlign: 'left',
        }}
      >
        {user ? user.userName : 'user name'}
      </Text>
      <FileInput
        accept="image/*"
        data-testid='inputFile'
        onChange={addFile}
        ref={fileInputRef}
        type="file"
      />
      <Button.Default
        styles={{
          marginBottom: 15,
          marginTop: 15,
        }}
        onClick={handleClick}
        title='Add a profile picture'
      />
      <Button.Default
        title='Edit your info'
        variant='secondary'
      />
    </Container>
  );
};

export default Information;

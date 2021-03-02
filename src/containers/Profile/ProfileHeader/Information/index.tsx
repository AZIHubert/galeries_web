import * as React from 'react';
import { useSelector } from 'react-redux';

import Button from '#components/Button';
import Text from '#components/Text';

import { userSelector } from '#store/selectors';

import {
  Container,
  FileInput,
} from './styles';

const Information = () => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const user = useSelector(userSelector);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

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
    <Container>
      <Text
        color='primary'
        fontWeight='bold'
        fontSize={2.4}
        textAlign='center'
        textAlignL='left'
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
      <Button
        marginBottom={15}
        marginTop={25}
        onClick={inputClick}
        title='Add a profile picture'
      />
      <Button
        title='Edit your info'
        variant='secondary'
      />
    </Container>
  );
};

export default Information;

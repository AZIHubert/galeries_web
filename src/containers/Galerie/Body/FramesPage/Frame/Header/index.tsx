import * as React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useSelector } from 'react-redux';

import Image from '#components/Image';
import Text from '#components/Text';

import theme from '#helpers/theme';

import {
  selectProfilPicture,
} from '#store/helpers';
import {
  userSelector,
} from '#store/selectors';

import {
  Container,
  ProfilePictureImage,
  UserContainer,
} from './styles';

interface HeaderI {
  user: UserI;
}

const Header = ({
  user,
}: HeaderI) => {
  const currentUser = useSelector(userSelector);

  return (
    <Container>
      <UserContainer>
        <ProfilePictureImage>
          <Image
            alt={`${user.userName}'s profile picture`}
            original={selectProfilPicture(user).croped}
            pending={selectProfilPicture(user).pending}
          />
        </ProfilePictureImage>
        <Text
          fontWeight='bold'
          styles={{
            fontSize: 0.8,
          }}
        >
          {user.userName}
        </Text>
      </UserContainer>
      {currentUser
       && currentUser.id === user.id
       && (
         <AiOutlineDelete
           color={theme.colors.danger}
           size={15}
         />
       )
      }
    </Container>
  );
};

export default Header;

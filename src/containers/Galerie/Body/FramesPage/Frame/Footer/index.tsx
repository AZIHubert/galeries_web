import moment from 'moment';
import * as React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

import Text from '#components/Text';

import theme from '#helpers/theme';

import {
  Container,
  LikeContainer,
} from './styles';

interface FooterI {
  createdAt: Date;
  likes: LikeI[];
}

const Footer = ({
  createdAt,
  likes,
}: FooterI) => (
  <Container>
    <LikeContainer>
      <Text
        fontWeight='bold'
      >
        {likes.length} like{likes.length > 1}
      </Text>
      <AiOutlineHeart
        color={theme.colors.danger}
        size={25}
      />
    </LikeContainer>
    <Text
      fontWeight='lighter'
      styles={{
        fontSize: 0.55,
        textAlign: 'center',
      }}
    >
      {moment(createdAt).calendar()}
    </Text>
  </Container>
);

export default Footer;

import * as React from 'react';

import Text from '#components/Text';

import {
  Footer as FooterContainer,
} from './styles';

const Footer = () => (
  <FooterContainer>
    <Text
      fontWeight='lighter'
      styles={{
        fontSize: 0.65,
        marginBottom: 10,
      }}
      stylesMobile={{
        fontSize: 0.7,
      }}
      stylesLaptopL={{
        fontSize: 0.9,
      }}
    >
      Allan Aoudji @2021
    </Text>
  </FooterContainer>
);

export default Footer;

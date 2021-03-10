import * as React from 'react';

import Text from '#components/Text';

import { LogoGaleries } from '#ressources/svgComponents';

import {
  Container,
  GaleriesLogo,
} from './styles';

const Body = () => (
  <Container>
    <div>
      <Text
        fontWeight='bold'
        styles={{
          fontSize: 1.4,
          marginBottom: 10,
        }}
        stylesMobile={{
          fontSize: 1.6,
          marginBottom: 12,
        }}
        stylesLaptop={{
          fontSize: 2.5,
          marginBottom: 14,
        }}
        stylesLaptopL={{
          fontSize: 2.9,
          marginBottom: 17,
        }}
      >
        Welcome to
      </Text>
      <GaleriesLogo>
        <LogoGaleries />
      </GaleriesLogo>
      <Text
        fontStyle='italic'
        styles={{
          fontSize: 1.1,
          lineHeight: 1.35,
          marginLeft: 50,
        }}
        stylesMobile={{
          marginLeft: 60,
        }}
        stylesTablet={{
          fontSize: 1.2,
          lineHeight: 1.5,
          marginLeft: 120,
        }}
        stylesLaptopL={{
          fontSize: 1.4,
          lineHeight: 1.7,
          marginLeft: 145,
        }}
      >
        A web app to share
      </Text>
      <Text
        fontStyle='italic'
        styles={{
          fontSize: 1.1,
          lineHeight: 1.35,
          marginLeft: 50,
        }}
        stylesMobile={{
          marginLeft: 60,
        }}
        stylesTablet={{
          fontSize: 1.2,
          lineHeight: 1.5,
          marginLeft: 120,
        }}
        stylesLaptopL={{
          fontSize: 1.4,
          lineHeight: 1.7,
          marginLeft: 145,
        }}
      >
        pictures with
      </Text>
      <Text
        fontStyle='italic'
        styles={{
          fontSize: 1.1,
          lineHeight: 1.35,
          marginLeft: 50,
        }}
        stylesMobile={{
          marginLeft: 60,
        }}
        stylesTablet={{
          fontSize: 1.2,
          lineHeight: 1.5,
          marginLeft: 120,
        }}
        stylesLaptopL={{
          fontSize: 1.4,
          lineHeight: 1.7,
          marginLeft: 145,
        }}
      >
        your friends and family.
      </Text>
    </div>
  </Container>
);

export default Body;

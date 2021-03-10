import * as React from 'react';

import Text from '#components/Text';

import {
  Container,
} from './styles';

const ModalTitle = () => (
  <Container>
    <Text
      styles={{
        fontSize: 1.1,
        textAlign: 'center',
      }}
      stylesMobile={{
        fontSize: 1.2,
      }}
      stylesLaptopL={{
        fontSize: 1.4,
      }}
    >
      Verify your email
    </Text>
  </Container>
);

export default ModalTitle;

import * as React from 'react';

import Text from '#components/Text';

import {
  Container,
} from './styles';

const ModalTicketTitle = () => (
  <Container>
    <Text
      color='primary'
      styles={{
        fontSize: 1.2,
        textAlign: 'center',
      }}
      stylesMobile={{
        fontSize: 1.4,
      }}
      stylesLaptopL={{
        fontSize: 1.5,
      }}
    >
      Send a ticket
    </Text>
  </Container>
);

export default ModalTicketTitle;

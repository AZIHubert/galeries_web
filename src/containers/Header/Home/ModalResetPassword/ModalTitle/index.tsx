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
      }}
    >
      Enter your email to reset your password
    </Text>
  </Container>
);

export default ModalTitle;

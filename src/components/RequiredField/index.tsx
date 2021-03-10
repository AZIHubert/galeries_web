import * as React from 'react';

import Text from '#components/Text';

import {
  Container,
} from './styles';

const RequiredField = () => (
  <Container>
    <Text
      color='danger'
      styles={{
        fontSize: 0.8,
        marginRight: 5,
      }}
    >
      *
    </Text>
    <Text
      color='primary'
      styles={{
        fontSize: 0.8,
      }}
    >
      Required fields
    </Text>
  </Container>
);

export default RequiredField;

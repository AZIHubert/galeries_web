import * as React from 'react';
import styled from 'styled-components';

import Text from '#components/Text';

const Container = styled.div`
  margin-bottom: 20px;
`;

const ModalTicketTitle = () => (
  <Container>
    <Text
      textAlign='center'
      fontSize={1.4}
    >
      Send a ticket
    </Text>
  </Container>
);

export default ModalTicketTitle;

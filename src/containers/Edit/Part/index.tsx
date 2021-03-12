import * as React from 'react';

import Text from '#components/Text';

import {
  ChildrenContainer,
  Container,
  TitleContainer,
} from './styles';

interface PartI {
  danger?: boolean;
  title?: string;
}

const Part: React.FC<PartI> = ({
  children,
  danger = false,
  title,
}) => (
  <Container>
    { title ? (
      <TitleContainer
        danger={danger}
      >
        <Text
          color={danger ? 'danger' : 'black'}
          styles={{
            fontSize: 1.3,
            marginBottom: 12,
          }}
        >
          {title}
        </Text>
      </TitleContainer>
    ) : null}
    <ChildrenContainer>
      { children }
    </ChildrenContainer>
  </Container>
);

export default Part;

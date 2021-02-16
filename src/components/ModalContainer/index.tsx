import * as React from 'react';

import {
  Background,
  Container,
  InnerContainer,
  Title,
} from './styled';

type TextAlign = 'center' | 'end' | 'justify' | 'justify-all' | 'left' | 'match-parent' | 'right' | 'start';
type TitleWeight = 'bold' | 'normal';

interface ModalContainerI {
  open?: boolean;
  testId?: string;
  title?: string;
  titleMarginTop?: number;
  titleSize?: number;
  titleTextAlign?: TextAlign;
  titleWeight?: TitleWeight;
}

const ModalContainer: React.FC<ModalContainerI> = ({
  children,
  testId,
  title,
  titleMarginTop = 0,
  titleSize = 1.3,
  titleTextAlign,
  titleWeight = 'normal',
}) => (
  <Container
    testId={testId}
  >
    <InnerContainer>
      {title ? (
        <Title
          textAlign={titleTextAlign}
          titleMarginTop={titleMarginTop}
          titleSize={titleSize}
          titleWeight={titleWeight}
        >
          {title}
        </Title>
      ) : null}
      {children}
    </InnerContainer>
    <Background />
  </Container>
);

export default ModalContainer;

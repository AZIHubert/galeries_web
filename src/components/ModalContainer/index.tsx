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
  containerTestId?: string;
  title?: string;
  titleMarginTop?: number;
  titleSize?: number;
  titleTestId?: string;
  titleTextAlign?: TextAlign;
  titleWeight?: TitleWeight;
}

const ModalContainer: React.FC<ModalContainerI> = ({
  children,
  containerTestId,
  title,
  titleMarginTop = 0,
  titleSize = 1.3,
  titleTestId,
  titleTextAlign,
  titleWeight = 'normal',
}) => (
  <Container
    testId={containerTestId}
  >
    <InnerContainer>
      {title ? (
        <Title
          testId={titleTestId}
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

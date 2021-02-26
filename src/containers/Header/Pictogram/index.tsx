import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import {
  Container,
  InnerContainer,
} from './styles';

interface PictogramI {
  hoverPictogram: React.ComponentType;
  marginLeft?: number;
  marginLeftL?: number;
  marginRight?: number;
  marginRightL?: number;
  pictogram: React.ComponentType;
}

const Pictogram = ({
  hoverPictogram: HoverPictogramComponent,
  marginLeft = 0,
  marginLeftL,
  marginRight = 0,
  marginRightL,
  pictogram: PictogramComponent,
}: PictogramI) => {
  const [hover, setHover] = React.useState<boolean>(false);
  return (
    <Container
      marginLeft={marginLeft}
      marginLeftL={marginLeftL}
      marginRight={marginRight}
      marginRightL={marginRightL}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CSSTransition
        classNames='fade'
        in={hover}
        timeout={300}
        unmountOnExit
      >
        <InnerContainer>
          <HoverPictogramComponent />
        </InnerContainer>
      </CSSTransition>
      <CSSTransition
        classNames='fade'
        in={!hover}
        timeout={300}
        unmountOnExit
      >
        <InnerContainer>
          <PictogramComponent />
        </InnerContainer>
      </CSSTransition>
    </Container>
  );
};

export default Pictogram;

import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import {
  Container,
  Fader,
  InnerContainer,
} from './styles';

interface PictogramI {
  containerTestId?: string;
  hoverPictogram: React.ComponentType;
  hoverPictogramTestId?: string;
  marginLeft?: number;
  marginLeftL?: number;
  marginRight?: number;
  marginRightL?: number;
  onClick?: () => void;
  pictogram: React.ComponentType;
  pictogramTestId?: string;
}

const Pictogram = ({
  containerTestId,
  hoverPictogram: HoverPictogramComponent,
  hoverPictogramTestId,
  marginLeft = 0,
  marginLeftL,
  marginRight = 0,
  marginRightL,
  onClick,
  pictogram: PictogramComponent,
  pictogramTestId,
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
      testId={containerTestId}
    >
      <div
        onClick={() => {
          if (onClick) onClick();
        }}
      >
        <CSSTransition
          classNames='fade'
          in={hover}
          timeout={300}
          unmountOnExit
        >
          <Fader>
            <InnerContainer
              testId={hoverPictogramTestId}
            >
              <HoverPictogramComponent />
            </InnerContainer>
          </Fader>
        </CSSTransition>
        <CSSTransition
          classNames='fade'
          in={!hover}
          timeout={300}
          unmountOnExit
        >
          <InnerContainer
            testId={pictogramTestId}
          >
            <PictogramComponent />
          </InnerContainer>
        </CSSTransition>
      </div>
    </Container>
  );
};

export default Pictogram;

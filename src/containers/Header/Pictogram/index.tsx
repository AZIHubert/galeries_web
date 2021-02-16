import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface ContainerI {
  marginLeft?: number;
  marginLeftL?: number;
  marginRight?: number;
  marginRightL?: number;
}

interface PictogramI {
  hoverPictogram: React.ComponentType;
  marginLeft?: number;
  marginLeftL?: number;
  marginRight?: number;
  marginRightL?: number;
  pictogram: React.ComponentType;
}

const Container = styled.div<ContainerI>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 18px;
  margin: ${({
    marginLeft,
    marginRight,
  }) => (
    `0px ${marginRight}px 0px ${marginLeft}px`
  )};
  position: relative;
  width: 18px;
  @media ${mediaQueries.laptopL} {
    height: 22px;
    margin: ${({
    marginLeft,
    marginLeftL,
    marginRight,
    marginRightL,
  }) => {
    const marginL = marginLeftL || marginLeft;
    const marginR = marginRightL || marginRight;
    return `0px ${marginR}px 0px ${marginL}px`;
  }};
    width: 22px;
  }
`;

Container.defaultProps = {
  marginLeft: 0,
  marginRight: 0,
};

const InnerContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: 500ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: 500ms;
  }
`;

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

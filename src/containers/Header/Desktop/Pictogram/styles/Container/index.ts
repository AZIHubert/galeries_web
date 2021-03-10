import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface ContainerI {
  marginLeft?: number;
  marginLeftL?: number;
  marginRight?: number;
  marginRightL?: number;
  testId?: string;
}

const Container = styled.div.attrs<ContainerI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<ContainerI>`
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

export default Container;

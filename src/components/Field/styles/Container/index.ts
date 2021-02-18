import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface ContainerI {
  marginBottom?: number;
  marginBottomL?: number;
  marginTop?: number;
  marginTopL?: number;
  testId?: string;
}

const Container = styled.div.attrs<ContainerI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<ContainerI>`
  margin: ${({
    marginBottom,
    marginTop,
  }) => (
    `${marginTop}px 0 ${marginBottom}px 0`
  )};
  @media ${mediaQueries.laptopL} {
    margin : ${({
    marginBottom,
    marginBottomL,
    marginTop,
    marginTopL,
  }) => {
    const marginB = marginBottomL || marginBottom;
    const marginT = marginTopL || marginTop;
    return (
      `${marginT}px 0 ${marginB}px`
    );
  }};
  background-color: 'blue'
  }
`;

Container.defaultProps = {
  marginBottom: 0,
  marginTop: 0,
};

export default Container;

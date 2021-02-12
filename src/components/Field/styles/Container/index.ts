import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface ContainerI {
  marginBottom?: number;
  marginBottomL?: number;
  marginTop?: number;
  marginTopL?: number;
}

const Container = styled.div<ContainerI>`
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
  }}
  }
`;

Container.defaultProps = {
  marginBottom: 0,
  marginBottomL: 0,
  marginTop: 0,
  marginTopL: 0,
};

export default Container;

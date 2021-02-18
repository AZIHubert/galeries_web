import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface ContainerI {
  marginBottom?: number;
  marginBottomL?: number;
  marginTop?: number;
  marginTopL?: number;
}

const Container = styled.p<ContainerI>`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
  font-style: italic;
  margin: ${({
    marginBottom,
    marginTop,
  }) => (
    `${marginTop}px 0 ${marginBottom}px 0`
  )};
  overflow: hidden;
  text-align: center;
  &::before {
    margin-left: -50%;
    right: 1.3em;
  }
  &::after {
    left: 1.3em;
    margin-right: -50%;
  }
  &::before, &::after {
    background-color: ${({ theme }) => theme.colors.primary};
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 50%;
  }
  @media ${mediaQueries.laptopL} {
    font-size: 1.3rem;
    margin: ${({
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
  marginTop: 0,
};

export default Container;

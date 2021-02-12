import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

type jJustifyContent = 'center' | 'end' | 'flex-end' | 'flex-start' | 'normal' | 'right' | 'safe' | 'space-around' | 'space-evenly' | 'start' | 'stretch' | 'unsafe';

interface ContainerI {
  fontSize?: number;
  fontSizeL?: number;
  justifyContent?: jJustifyContent;
  marginBottom?: number;
  marginTop?: number;
}

const Container = styled.div<ContainerI>`
  display: flex;
  font-size: ${({ fontSize }) => (`${fontSize}rem`)};
  justify-content: ${({ justifyContent }) => justifyContent};
  margin: ${({
    marginBottom,
    marginTop,
  }) => (
    `${marginTop}px 0 ${marginBottom}px`
  )};
  @media ${mediaQueries.laptopL} {
    font-size: ${({
    fontSize,
    fontSizeL,
  }) => {
    const size = fontSizeL || fontSize;
    console.log(size, fontSizeL);
    return (
      `${size}rem`
    );
  }}
  }
`;

Container.defaultProps = {
  fontSize: 1,
  fontSizeL: 1,
  justifyContent: 'flex-start',
  marginBottom: 0,
  marginTop: 0,
};

export default Container;

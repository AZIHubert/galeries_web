import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface ContainerI {
  fontSize?: number;
  fontSizeL?: number;
  justifyContent?: style.JustifyContent;
  marginBottom?: number;
  marginTop?: number;
  testId?: string;
}

const Container = styled.div.attrs<ContainerI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<ContainerI>`
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  font-size: ${({ fontSize }) => (`${fontSize}rem`)};
  justify-content: ${({ justifyContent }) => justifyContent};
  margin: ${({
    marginBottom,
    marginTop,
  }) => (
    `${marginTop}px 0 ${marginBottom}px 0px`
  )};
  @media ${mediaQueries.laptopL} {
    font-size: ${({
    fontSize,
    fontSizeL,
  }) => {
    const size = fontSizeL || fontSize;
    return (
      `${size}rem`
    );
  }};
  }
`;

Container.defaultProps = {
  fontSize: 1,
  justifyContent: 'flex-start',
  marginBottom: 0,
  marginTop: 0,
};

export default Container;

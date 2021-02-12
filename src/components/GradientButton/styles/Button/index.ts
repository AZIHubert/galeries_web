import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface ButtonI {
  marginBottom?: number;
  marginBottomL?: number;
  marginTop?: number;
  marginTopL?: number;
  testId?: string;
}

const Button = styled.button.attrs<ButtonI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<ButtonI>`
  background-image: ${({ theme }) => (
    `linear-gradient(90deg, ${theme.colors.tertiary} 0%, ${theme.colors.primary} 50%)`
  )};
  background-size: 200%;
  border: none;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  font-size: 0.9rem;
  height: 29px;
  margin: ${({
    marginBottom,
    marginTop,
  }) => (
    `${marginTop}px 0 ${marginBottom}px`
  )};
  padding: 0 10px;
  text-transform: capitalize;
  transition: ${({ theme }) => `background-position ${theme.transition.default} ease-in`};
  width: 100%;
  &:focus {
    outline: none;
  }
  &:hover {
    background-position: right;
  }
  @media ${mediaQueries.laptopL} {
    font-size: 1rem;
    height: 35px;
    margin: ${({
    marginBottom,
    marginBottomL,
    marginTop,
    marginTopL,
  }) => {
    const marginB = marginBottomL || marginBottom;
    const marginT = marginTopL || marginTop;
    return (
      `${marginT}px 0 ${marginB}px 0`
    );
  }};
  }
`;

Button.defaultProps = {
  marginBottom: 0,
  marginBottomL: 0,
  marginTop: 0,
  marginTopL: 0,
};

export default Button;

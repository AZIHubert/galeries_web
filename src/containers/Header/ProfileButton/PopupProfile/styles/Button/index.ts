import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface ButtonI {
  borderBottom?: boolean;
  testId?: string;
}

const Button = styled.button.attrs<ButtonI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<ButtonI>`
  align-items: center;
  background-color: transparent;
  border: none;
  border-bottom: ${({
    borderBottom,
    theme,
  }) => (
    borderBottom && `1px solid ${theme.colors.primary}`
  )};
  display: flex;
  cursor: pointer;
  height: 50px;
  padding: 10px 3px;
  width: 100%;
  &:focus {
    outline: none;
  }
  @media ${mediaQueries.laptopL} {
    height: 65px;
  }
`;

Button.defaultProps = {
  borderBottom: false,
};

export default Button;

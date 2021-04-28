import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const AddButton = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  bottom: 15px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  height: 32px;
  justify-content: center;
  left: ${({ theme }) => `${theme.wrapper.margin.smallest}px`};
  position: fixed;
  width: 32px;
  transition: ${({ theme }) => `transform ${theme.transition.default}`};
  & svg {
    transition: ${({ theme }) => `transform ${theme.transition.default}`};
  }
  &:hover {
    transform: scale(1.04);
    & svg {
      transform: rotate(180deg) scale(0.96);
    }
  }
  @media ${mediaQueries.mobileL} {
    left: ${({ theme }) => `${theme.wrapper.margin.small}px`};
  }
  @media ${mediaQueries.tablet} {
    bottom: 30px;
  }
  @media ${mediaQueries.laptop} {
    left: ${({ theme }) => `${theme.wrapper.margin.medium}px`};
  }
  @media ${mediaQueries.laptopL} {
    bottom: 40px;
    height: 38px;
    left: ${({ theme }) => `${theme.wrapper.margin.large}px`};
    width: 38px;
  }
`;

export default AddButton;

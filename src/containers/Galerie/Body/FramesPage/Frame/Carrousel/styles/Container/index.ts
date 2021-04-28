import styled from 'styled-components';

const Container = styled.div`
  border-bottom: ${({ theme }) => (
    `2px solid ${theme.colors.primary}`
  )};
  margin-bottom: 10px;
  position: relative;
  &:hover {
    & .arrow {
      opacity: 0.75;
      &:hover {
        opacity: 1;
      }
    }
    & .coverPictureButton {
      opacity: 0.75;
      &:hover {
        opacity: 1;
      }
    }
  }
`;

export default Container;

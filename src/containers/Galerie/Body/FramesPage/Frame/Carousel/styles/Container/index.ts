import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  &:hover {
    & .arrow {
      opacity: 0.5;
    }
    & .coverPictureButton {
      opacity: 1;
    }
  }
`;

export default Container;

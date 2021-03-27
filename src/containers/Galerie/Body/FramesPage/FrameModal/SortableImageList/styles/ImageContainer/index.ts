import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  width: 33.33%;
  &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export default ImageContainer;

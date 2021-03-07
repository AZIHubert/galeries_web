import styled from 'styled-components';

interface ImageContainerI {
  isPending?: boolean;
}

const ImageContainer = styled.div<ImageContainerI>`
  opacity: ${({ isPending }) => (isPending ? 0.1 : 1)};
  position: absolute;
  right: 0;
  top: 0;
  transition: ${({ theme }) => theme.transition.slow};
  width: 100%;
`;

ImageContainer.defaultProps = {
  isPending: true,
};

export default ImageContainer;

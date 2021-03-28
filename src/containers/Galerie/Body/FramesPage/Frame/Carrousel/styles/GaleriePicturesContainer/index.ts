import styled from 'styled-components';

interface GaleriePicturesContainerI {
  position: number;
}

const GaleriePicturesContainer = styled.ul<GaleriePicturesContainerI>`
  position: relative;
  height: 436px;
  transition: ${({ theme }) => `transform ${theme.transition.default}`};
  transform: ${({ position }) => `translateX(-${position}px)`};
`;

GaleriePicturesContainer.defaultProps = {
  position: 0,
};

export default GaleriePicturesContainer;

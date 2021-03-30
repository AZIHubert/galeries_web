import styled from 'styled-components';

interface ContainerI {
  bigPicture: boolean;
}

const Container = styled.div<ContainerI>`
  aspect-ratio: 1;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  grid-row: ${({ bigPicture }) => `span ${bigPicture ? '2' : '1'}`};
  grid-column: ${({ bigPicture }) => `span ${bigPicture ? '2' : '1'}`};
  &:hover .button {
    opacity: 1;
    transform: scale(1);
  }
`;

export default Container;

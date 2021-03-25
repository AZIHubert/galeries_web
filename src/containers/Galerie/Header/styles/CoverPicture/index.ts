import styled from 'styled-components';

interface CoverPictureI {
  backgroundColor: string;
}

const CoverPicture = styled.div<CoverPictureI>`
  background-image: ${({ backgroundColor }) => backgroundColor};
  border-radius: 0 0 10px 10px;
  height: 280px;
  width: 70%;
`;

export default CoverPicture;

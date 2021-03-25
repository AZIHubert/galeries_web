import styled from 'styled-components';

interface CoverPictureI {
  backgroundColor: string;
}

const CoverPicture = styled.div<CoverPictureI>`
  background-image: ${({ backgroundColor }) => backgroundColor};
  border-radius: 0 0 10px 10px;
  height: 250px;
  width: 65%;
`;

export default CoverPicture;

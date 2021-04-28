import styled from 'styled-components';

interface CoverPictureI {
  backgroundColor: string;
}

const CoverPicture = styled.div<CoverPictureI>`
  background-image: ${({ backgroundColor }) => backgroundColor};
  border-radius: 0 0 15px 15px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  height: 230px;
  width: 65%;
`;

export default CoverPicture;

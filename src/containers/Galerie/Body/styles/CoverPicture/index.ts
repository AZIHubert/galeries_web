import styled from 'styled-components';

interface CoverPictureI {
  backgroundColor: string;
}

const CoverPicture = styled.div<CoverPictureI>`
  background-image: ${({ backgroundColor }) => backgroundColor};
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.boxShadow};
  height: 25px;
  margin-right: 10px;
  width: 25px;
`;

export default CoverPicture;

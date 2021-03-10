import styled from 'styled-components';

interface InnerContainerI {
  isCover: boolean;
}

const InnerContainer = styled.div<InnerContainerI>`
  box-shadow: ${({ theme }) => theme.boxShadow};
  height: ${({ isCover }) => (isCover ? 'auto' : '100%')};
`;

export default InnerContainer;

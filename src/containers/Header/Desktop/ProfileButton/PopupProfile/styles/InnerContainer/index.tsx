import styled from 'styled-components';

const InnerContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  flex-direction: column;
  padding: 4px 15px;
  width: 100%;
  z-index: 1;
`;

export default InnerContainer;

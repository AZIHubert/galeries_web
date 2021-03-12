import styled from 'styled-components';

const NameContainer = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.primary}`};
  margin-bottom: 10px;
  padding-bottom: 10px;
`;

export default NameContainer;

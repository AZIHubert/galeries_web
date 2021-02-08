import styled from 'styled-components';

const CancelButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

export default CancelButton;

import styled from 'styled-components';

const Error = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  display: flex;
  font-size: 0.7rem;
  font-style: italic;
  justify-content: flex-end;
`;

export default Error;

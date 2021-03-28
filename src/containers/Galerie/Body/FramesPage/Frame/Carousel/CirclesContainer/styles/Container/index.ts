import styled from 'styled-components';

const Container = styled.div`
  border-top: ${({ theme }) => (
    `2px solid ${theme.colors.primary}`
  )};
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

export default Container;

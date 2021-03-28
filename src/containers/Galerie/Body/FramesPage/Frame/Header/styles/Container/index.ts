import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  border-bottom: ${({ theme }) => (
    `2px solid ${theme.colors.primary}`
  )};
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
`;

export default Container;

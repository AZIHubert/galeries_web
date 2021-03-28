import styled from 'styled-components';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => (
    `2px solid ${theme.colors.primary}`
  )};
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  overflow: hidden;
  width: 440px;
`;

export default Container;

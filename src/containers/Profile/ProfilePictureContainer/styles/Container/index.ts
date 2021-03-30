import styled from 'styled-components';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.quaternay};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: grid;
  grid-gap: 3px;
  grid-template-columns: repeat(6, 1fr);
  margin: 60px 90px;
  padding: 20px;
`;

export default Container;

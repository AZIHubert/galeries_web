import styled from 'styled-components';

const Container = styled.header`
  background-color: ${({ theme }) => theme.colors.secondary};
  position: fixed;
  width: 100%;
  z-index: 10;
`;

export default Container;

import styled from 'styled-components';

const Container = styled.header`
  background-color: ${({ theme }) => theme.colors.secondary};
  position: absolute;
  width: 100%;
`;

export default Container;

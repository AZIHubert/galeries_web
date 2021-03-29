import styled from 'styled-components';

const Container = styled.header`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.quaternay};
  border-radius: 0 0 15px 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default Container;

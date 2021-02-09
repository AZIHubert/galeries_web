import styled from 'styled-components';

const Container = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  font-size: 0.8rem;
  justify-content: flex-end;
  & {
    p:nth-child(1) {  
      color: ${({ theme }) => theme.colors.danger};
      margin-right: 5px;
    }
  }
`;

export default Container;

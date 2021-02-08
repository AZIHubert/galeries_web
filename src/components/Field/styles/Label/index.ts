import styled from 'styled-components';

const Label = styled.label`
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  font-family: 'HelveticaLTstd';
  font-size: 0.8rem;
  margin-bottom: 5px;
  & {
    p:nth-child(2) {  
      color: ${({ theme }) => theme.colors.danger};
      margin-left: 5px;
    }
  }
`;

export default Label;

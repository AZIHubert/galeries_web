import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Label = styled.label`
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  font-family: 'HelveticaLTstd';
  font-size: 0.7rem;
  margin-bottom: 5px;
  & {
    p:nth-child(2) {  
      color: ${({ theme }) => theme.colors.danger};
      margin-left: 5px;
    }
  }
  @media ${mediaQueries.laptopL} {
    font-size: 0.95rem;
    margin-bottom: 6px;
  }
`;

export default Label;

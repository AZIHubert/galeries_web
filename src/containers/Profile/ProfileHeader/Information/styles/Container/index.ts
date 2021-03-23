import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Container = styled.div`
  align-items: 'center';
  display: flex;
  flex-direction: column;
  width: 240px;
  @media ${mediaQueries.laptopL} { 
    width: 340px;
  }
`;

export default Container;

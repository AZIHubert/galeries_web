import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Container = styled.div`
  margin-bottom: 20px;
  @media ${mediaQueries.laptopL} {
    margin-bottom: 25px;
  }
`;

export default Container;

import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Container = styled.div`
  margin-bottom: 20px;
  @media ${mediaQueries.mobileL} {
    margin-bottom: 30px;
  }
`;

export default Container;

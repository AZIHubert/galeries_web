import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Container = styled.div`
align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media ${mediaQueries.tablet} {
    flex-direction: row;
  }
`;

export default Container;

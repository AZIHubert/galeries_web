import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${mediaQueries.tablet} {
    flex-direction: row;
  }
`;

export default Container;

import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 320px;
  @media ${mediaQueries.laptopL} {
    width: 450px;
  }
`;

export default Container;

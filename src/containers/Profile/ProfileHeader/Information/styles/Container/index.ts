import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Container = styled.div`
  align-items: 'center';
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 240px;
  @media ${mediaQueries.laptop} {
    margin-top: 0;
  }
`;

export default Container;

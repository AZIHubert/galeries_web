import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const LogoContainer = styled.div`
  height: 25px;
  margin-right: 22px;
  width: 28px;
  @media ${mediaQueries.laptopL} {
    height: 28px;
    margin-right: 26px;
    width: 32px;
  }
`;

export default LogoContainer;

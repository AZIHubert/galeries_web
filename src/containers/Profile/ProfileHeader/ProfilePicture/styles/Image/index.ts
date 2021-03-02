import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Image = styled.img`
  width: 120px;
  @media ${mediaQueries.tablet} {
    width: 160px;
  }
  @media ${mediaQueries.laptopL} {
    width: 190px;
  }
`;

export default Image;

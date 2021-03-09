import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Body = styled.div`
  flex-grow: 1;
  padding-top: ${({ theme }) => (`${theme.header.dashboard.height.small + 70}px`)};
  @media ${mediaQueries.mobileL} {
    padding-top: ${({ theme }) => (`${theme.header.dashboard.height.small + 80}px`)};
  }
  @media ${mediaQueries.laptop} {
    padding-top: ${({ theme }) => (`${theme.header.dashboard.height.small + 90}px`)};
  }
  @media ${mediaQueries.laptopL} { 
    padding-top: ${({ theme }) => (`${theme.header.dashboard.height.small + 120}px`)};
  }
`;

export default Body;

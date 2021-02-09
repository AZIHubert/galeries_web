import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

import LogoGFill from '#ressources/svg/logoGFill.svg';

const BackgroundImage = styled.div`
  background-image: url(${LogoGFill});
  background-position: bottom 5% right -10%;
  background-repeat: no-repeat;
  background-size: 250px;
  height: 100%;
  left: 0;
  opacity: 0.4;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
  @media ${mediaQueries.mobileL} {
    background-position: bottom 7% right 2%;
  }
  @media ${mediaQueries.laptop} {
    background-position: bottom 10% right 5%;
  }
  @media ${mediaQueries.laptopL} { 
    background-position: bottom 12% right 10%;
    background-size: 350px;
  }
`;

export default BackgroundImage;

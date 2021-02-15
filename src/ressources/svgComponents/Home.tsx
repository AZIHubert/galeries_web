import * as React from 'react';
import styled from 'styled-components';

const StyledSVG = styled.svg`
    height: 100%;
    & path {
        fill: ${({ theme }) => theme.colors.primary}
    }
`;

const Home = () => (
  <StyledSVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 784.16 904.91"
  >
    <g data-name="Layer 2">
      <path
        d="M784.16 904.91H450.91V665.59H332.57v239.32H0V336.39L392.08 0l392.08 336.39zm-258.25-75h183.25v-459l-317.08-272L75 370.86v459.05h182.57V590.59h268.34z"
        data-name="Layer 1"
      />
    </g>
  </StyledSVG>
);

export default Home;

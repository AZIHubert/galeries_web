import * as React from 'react';
import styled from 'styled-components';

const StyledSVG = styled.svg`
    height: 100%;
    & path {
        fill: ${({ theme }) => theme.colors.primary}
    }
`;

function HomeHover() {
  return (
    <StyledSVG
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 784.16 904.91"
    >
      <g data-name="Layer 2">
        <path
          d="M392.08 0L0 336.39v568.52h332.57V665.6h118.34v239.31h333.25V336.39L392.08 0z"
          data-name="Layer 1"
        />
      </g>
    </StyledSVG>
  );
}

export default HomeHover;

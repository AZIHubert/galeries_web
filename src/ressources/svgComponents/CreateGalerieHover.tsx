import * as React from 'react';
import styled from 'styled-components';

const StyledSVG = styled.svg`
    height: 100%;
    & path {
        fill: ${({ theme }) => theme.colors.primary}
    }
`;

function SvgCreateGalerieHover() {
  return (
    <StyledSVG
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 893 893"
    >
      <g data-name="Layer 2">
        <path
          d="M711.5 0h-530C81.42 0 0 81.42 0 181.5v530C0 811.58 81.42 893 181.5 893h530C811.58 893 893 811.58 893 711.5v-530C893 81.42 811.58 0 711.5 0zm-41.44 484H484v186.06h-75V484H222.94v-75H409V222.94h75V409h186.06z"
          data-name="Layer 1"
        />
      </g>
    </StyledSVG>
  );
}

export default SvgCreateGalerieHover;
